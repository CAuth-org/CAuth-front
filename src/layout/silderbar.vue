<script setup>
import { useRouter, useRoute } from "vue-router";
import { modulesRouters } from "@/router/index.js";
import { ref, onMounted, computed } from 'vue'
import MenuItem from "@/layout/MenuItem.vue";
import * as Icons from "@element-plus/icons-vue"; // 导入所有图标
const router = useRouter();
const route = useRoute(); // 获取当前路由对象

const menuItems = ref([])

// console.log(menuItems);

// 在组件挂载后加载菜单项
onMounted(async () => {
  menuItems.value = await modulesRouters();
  //console.log(menuItems.value); // 检查数据是否正确加载
});

// 计算当前路由
const activeRoute = computed(() => {
  return route.path;
});

const goTo = (path) => {
  router.push(path);
};
</script>

<template>
  <div class="menu-container">
    <div class="Nav-title">
      CAuth-Admin
    </div>
    <el-menu :default-active="activeRoute" router class="el-menu-vertical">
      <MenuItem :menu="menuItems"></MenuItem>
    </el-menu>
  </div>
</template>

<style scoped>
.menu-container {
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* 确保圆角生效 */
  display: flex;
  flex-direction: column;
}

.el-menu-vertical {
  flex-grow: 1;
  border: none;
  overflow-y: auto;
  background-color: #f5f7fa;
}

.el-menu-vertical::-webkit-scrollbar {
  width: 6px;
}

.el-menu-vertical::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 3px;
}

.Nav-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  padding: 15px 0;
  background: linear-gradient(135deg, #409EFF, #66b1ff);
  transition: all 0.3s ease;
}

.Nav-title:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* 移除旧的 .el-menu 样式，因为已经被 .menu-container 和 .el-menu-vertical 替代 */

.el-menu-item-select {
  color: #409EFF !important;
}
</style>