<script setup >
import { onMounted, ref,watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import UserInfoService from "@/util/UserInfoService";

const router = useRouter();
const route = useRoute();

const path = ref(route.path);
const routeTitle = ref(route.meta.title);


// 监听 route.path 变化，更新 path
watch(() => route.path, (newPath) => {
  path.value = newPath;
});

watch(() => route.meta.title, (newTitle) => {
  routeTitle.value = newTitle;
})

const logout = () => {
  UserInfoService.remove();
  router.push("/login");
};
</script>

<template>
  <div class="header">
    <div>{{routeTitle}}</div>
    <div>
        <el-button type="danger" @click="logout">退出</el-button>
    </div>
    
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 100%;
  background: linear-gradient(135deg, #ffffff, #f5f7fa);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

.header:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>