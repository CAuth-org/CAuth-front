<template>
  <div ref="background" class="vanta-bg"></div>
    <div class="login-container">
      <el-card class="login-card">
        <h2 class="login-title">后台管理系统</h2>
        
        <el-form :model="loginForm" :rules="rules" ref="loginFormRef" @keyup.enter="handleLogin">
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
        color: 0x1a237e, // 深靛蓝，更沉稳
        shininess: 50, // 增加光泽感
        waveHeight: 10, // 降低波浪高度，使其更柔和
        waveSpeed: 0.3, // 减慢波浪速度
        zoom: 0.8, // 稍微缩小视野
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
    loginFormRef.value.validate(async (valid) => {
      if (!valid) return;

      loading.value = true;
      try {
        const res = await loginApi.login(loginForm.value);
        console.log(res);
        UserInfoService.set(res);
        router.push("/dashboard"); // 登录成功后跳转
        ElMessage.success("登录成功");
      } catch (error) {
        console.error("登录失败:", error);
        ElMessage.error("用户名或密码错误");
      } finally {
        loading.value = false;
      }
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
  
  @keyframes fadeIn-down {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .login-card {
    width: 400px; /* 适当加宽 */
    padding: 30px;
    border-radius: 15px; /* 更大的圆角 */
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2); /* 更深的阴影 */
    background-color: rgba(255, 255, 255, 0.15); /* 毛玻璃效果 */
    backdrop-filter: blur(10px); /* 模糊背景 */
    border: 1px solid rgba(255, 255, 255, 0.2); /* 增加边框，提升质感 */
    animation: fadeIn-down 0.8s ease-out; /* 应用进入动画 */
  }
  
  .login-title {
    color: #fff; /* 标题颜色改为白色 */
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* 加深文字阴影以提高对比度 */
  }
  
  .login-title {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .login-button {
    width: 100%;
    border: none;
    background: linear-gradient(45deg, #409eff, #66b1ff);
    transition: all 0.3s ease-in-out;
    box-shadow: 0 2px 8px rgba(64, 158, 255, 0.3);
  }

  .login-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(64, 158, 255, 0.4);
    filter: brightness(1.1);
  }

  .login-button:active {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(64, 158, 255, 0.3);
  }

  /* --- Input Styles --- */
  :deep(.el-input__wrapper) {
    background-color: transparent !important;
    box-shadow: none !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 0;
    padding: 0 5px;
    transition: border-color 0.3s ease;
  }

  :deep(.el-input__wrapper.is-focus) {
    border-color: #409eff;
  }

  :deep(.el-input__inner) {
    color: #fff !important;
    background-color: transparent !important;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4); /* 为输入文字添加阴影 */
  }

  :deep(.el-input__inner::placeholder) {
    color: rgba(255, 255, 255, 0.7) !important;
  }

  :deep(.el-input__prefix .el-icon) {
    color: rgba(255, 255, 255, 0.8);
  }

  /* --- Checkbox Styles --- */
  :deep(.el-checkbox__label) {
    color: #fff;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4); /* 为复选框文字添加阴影 */
  }

  :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
    background-color: #409eff;
    border-color: #409eff;
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