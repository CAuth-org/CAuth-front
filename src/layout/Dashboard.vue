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
  background-color: #f0f0f0;
}

.box {
  background-color: white;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
  /* 半透明灰色阴影 */
  border-radius: 3px;
  /* 可选：圆角 */
}

.router-view {
  height: 100%;
  box-sizing: border-box;
}

.el-header {
  padding: 10px 10px 0 10px;
}

.el-main {
  padding: 10px 10px 5px 10px;
}

.slide-enter-active,
.slide-leave-active {
	transition: opacity 0.1s ease-in-out,transform 0.1s ease-in-out;
}

.slide-leave-to {
	opacity: 0;
  transform: translateX(5%); /* 初始时从右侧之外开始 */
}

.slide-enter-from{
  opacity: 0;
  transform: translateX(-5%);
}

.footer{
  background-color: none;
  margin: 0px 10px 10px 10px;
  font-size: 10px;
  text-align: center;
  opacity: 0.5;
}


</style>