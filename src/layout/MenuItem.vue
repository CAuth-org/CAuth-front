<template>
    <div v-for="item in menu" :key="item.path" :index="item.path">
        <!-- 如果没有子元素 -->
        <el-menu-item v-if="!isChildRoute(item) && isHasRole(item)" :class="{ 'el-menu-item-select': activeRoute === item.path }"
            :index="item.path">
            <el-icon>
                <component :is="Icons[item.meta.icon]" />
            </el-icon>
            <span>{{ item.meta.title }}</span>
        </el-menu-item>
        <!-- 如果有子元素 -->
        <el-sub-menu v-if="isChildRoute(item) && isHasRole(item)" :index="item.path">
            <template #title>
                <el-icon>
                    <component :is="Icons[item.meta.icon]" />
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <menu-item :menu="item.children" />
        </el-sub-menu>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, computed } from "vue";
import * as Icons from "@element-plus/icons-vue"; // 导入所有图标
import UserInfoService from "@/util/UserInfoService";

const props = defineProps({
    menu: {
        type: Array,
        required: true
    }
});

const route = useRoute(); // 获取当前路由对象

// 计算当前路由
const activeRoute = computed(() => route.path);

//判断当前路由是否为子路由
const isChildRoute = (item) => {
    return item.children && item.children.length > 0;
}

const isHasRole = (item) => {
    let role =  UserInfoService.get()?.role;
    return item.meta.roles.includes(role);
}


</script>

<style scoped>
.el-menu-item-select {
    color: #409EFF !important;
}
</style>