<template>
  <div ref="background" class="vanta-bg"></div>
    <div class="login-container">
      <el-card class="login-card">
        <h2 class="login-title">后台管理系统</h2>
        
        <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名">
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
  
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" show-password placeholder="请输入密码">
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
  
          <!-- 记住我 -->
          <el-form-item>
            <el-checkbox v-model="loginForm.rememberMe">记住我</el-checkbox>
          </el-form-item>
  
          <!-- 登录按钮 -->
          <el-form-item>
            <el-button type="primary" :loading="loading" @click="handleLogin" class="login-button">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref ,onMounted , onUnmounted} from "vue";
  import { useRouter } from "vue-router";
  import { User, Lock } from "@element-plus/icons-vue";
  import { ElMessage } from "element-plus";
  import StrorageService from "@/util/StorageService"
  import loginApi from "@/api/login";
  import UserInfoService from "@/util/UserInfoService";

  import * as THREE from "three";
  import CLOUDS2  from "vanta/dist/vanta.clouds2.min"; // 3D 波浪效果
  import CLOUDS  from "vanta/dist/vanta.clouds.min"; // 3D 波浪效果
  import WAVES from "vanta/dist/vanta.waves.min"; // 引入 WAVES
  import BIRDS from 'vanta/dist/vanta.birds.min'
    import DOTS from 'vanta/dist/vanta.dots.min'
  
  const router = useRouter();
  const loginFormRef = ref(null);
  const loading = ref(false);
  const background = ref(null);
  let vantaEffect = null;
  
  // 登录数据
  const loginForm = ref({
    username: "",
    password: "",
    rememberMe: false
  });

  onMounted(() => {
      vantaEffect = WAVES({
        el: background.value,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x5588, // 主要颜色（蓝色）
        shininess: 30, // 光亮度
        waveHeight: 15, // 波浪高度
        waveSpeed: 0.5, // 波浪速度
        zoom: 5, // 缩放
        mouseControls: false,	// 是否允许动画和鼠标手势交互，想启用的话改成true
      });

      // vantaEffect =  BIRDS({
      //   el: background.value,
      //   THREE,
      // })
    //   vantaEffect =DOTS({
    //     THREE,
    //     el: background.value,
    // mouseControls: false,	// 是否允许动画和鼠标手势交互，想启用的话改成true
    // touchControls: false,	// 触摸屏交互
    // gyroControls: false,	// 加速度交互，应该是晃动手机的效果
    // speed: 0.5,		// 动画速度，不喜欢太快的动画，所以设得小一些
    //   });
    });

    onUnmounted(() => {
      if (vantaEffect) vantaEffect.destroy(); // 避免内存泄漏
    });
  
  // 校验规则
  const rules = {
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
  };
  
  // 处理登录逻辑
  const handleLogin = () => {
    loginFormRef.value.validate((valid) => {
        loginApi.login(loginForm.value).then((res) => {
          console.log(res);
          UserInfoService.set(res)
          router.push("/dashboard"); // 登录成功后跳转
        });
        //StrorageService.set("token", "123456",5000000);
        //router.push("/dashboard"); // 登录成功后跳转
    //   if (!valid) return;
  
    //   loading.value = true;
    //   setTimeout(() => {
    //     loading.value = false;
  
    //     if (loginForm.value.username === "admin" && loginForm.value.password === "123456") {
    //       ElMessage.success("登录成功");
    //       router.push("/dashboard"); // 登录成功后跳转
    //     } else {
    //       ElMessage.error("用户名或密码错误");
    //     }
    //   }, 1000);
    });
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
  }
  
  .login-card {
    width: 350px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255,0.8);
  }
  
  .login-title {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .login-button {
    width: 100%;
  }

  .vanta-bg{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1; /* 确保背景在最底层 */
  }
  </style>