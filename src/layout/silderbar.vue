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
  <el-menu :default-active="activeRoute" router>
    <div class="Nav-title">
      CAuth-Admin
    </div>
    <MenuItem :menu="menuItems"></MenuItem>
  </el-menu>
</template>

<style scoped>
.el-menu {
  height: 100%;
  border: 0px;
}

.el-menu-item-select {
  color: #409EFF !important;
}

.Nav-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  padding: 15px 0;
  background-color: #409EFF;
  border-bottom: 1px solid #dcdfe6;
}
</style>