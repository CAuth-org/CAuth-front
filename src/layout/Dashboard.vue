<script setup lang="ts">
import Sidebar from '@/layout/silderbar.vue'
import Header from '@/layout/Header.vue'
import { ref, onMounted } from 'vue'

const version = ref("V1.0.0");

</script>

<template>
  <div class="component">
    <el-container style="height: 100vh;width: 100vw;">
      <!-- 侧边栏 -->
      <el-aside class="Navbar box">
        <Sidebar />
      </el-aside>


      <el-container>
        <!-- 顶部栏 -->
        <el-header>
          <Header class="box" />
        </el-header>

        <!-- 右侧内容 -->
        <el-main>
          <!-- <transition name="slide-fade" mode="out-in">
            <router-view class="router-view box" />
          </transition> -->

          <router-view v-slot="{ Component }" class="router-view box">
            <transition name="slide" mode="out-in" >
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
        <div class="footer">
          by CAuth-Admin backEnd Version {{ version }}
        </div>
      </el-container>
    </el-container>
  </div>

</template>

<style scoped>
.Navbar {
  min-width: 200px;
  width: auto;
  margin: 10px 0 10px 10px;
}


.component {
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  min-height: 100vh;
}

.box {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.box:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.router-view {
  height: 100%;
  box-sizing: border-box;
}

.el-header {
  padding: 10px 10px 0 10px;
  border: none;
}

.el-main {
  padding: 10px 10px 5px 10px;
  background-color: transparent;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.footer {
  margin: 10px;
  font-size: 12px;
  text-align: center;
  color: #888;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.footer:hover {
  opacity: 1;
}


</style>