import axios from 'axios';
import StorageService from './StorageService';
import { ElMessage } from 'element-plus';
import UserInfoService from './UserInfoService';
import router from '@/router'
import { nextTick } from 'vue';

// 创建 axios 实例
const axiosInstance = axios.create({
  baseURL: '/api', // 替换为你的 API 基础 URL
  timeout: 10000, // 请求超时时间，单位为毫秒
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加请求拦截器（可选）
axiosInstance.interceptors.request.use(
  (config) => {
    // 这里可以添加 token 等认证信息
    const token = UserInfoService.get()?.token;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    // 请求失败时的错误处理
    return Promise.reject(error);
  }
);

// 添加响应拦截器（可选）
axiosInstance.interceptors.response.use(
  async (response) => {
    // 可以在这里处理响应数据，例如：统一处理返回值
    let responseData = response.data;
    console.log("response",responseData);
    
    //未认证
    if(responseData.code == 502){
      ElMessage.error(`用户信息过期或不存在`);
      UserInfoService.remove();
      await router.replace("/login");
      return;
      //return Promise.reject(new Error(responseData.message));
    }

    if(responseData.code != 200){
        ElMessage.error(`server error: ${responseData.message}`);
        return Promise.reject(new Error(responseData.message));
    }


    return response.data.data;
  },
  (error) => {
    let responseData = response.data;
    ElMessage.error(`server error: ${responseData.message}`);
    return Promise.reject(error);
  }
);

export default axiosInstance;