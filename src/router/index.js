import { createRouter, createWebHistory } from "vue-router";
import login from "@/views/login/index.vue";
import { ElMessage } from "element-plus";
import UserInfoService from "@/util/UserInfoService";

// 动态加载所有子路由模块
const modules = import.meta.glob("./modules/**/*.js");

const modulesRouters = async () => {
  const res = [];

  for (const path in modules) {
    let module = await modules[path]();

    // 检查模块的导出类型
    if (Array.isArray(module.default)) {
      // 如果是数组，直接将数组中的路由项添加到路由配置中
      res.push(...module.default);
    } else if (typeof module.default === 'object') {
      // 如果是对象，直接添加该对象
      res.push(module.default);
    } else {
      console.error(`模块 ${path} 的导出类型无效`);
    }

    //res.push(module.default);
  }

  return res;
};

// 遍历每个模块，动态导入并将路由配置加入 routes 数组

// console.log(await modulesRouters());


const routes = [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta:{
      // 无需认证
      noAuthToken: true,
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/layout/Dashboard.vue"),
    children: await modulesRouters(),
  },
  // 404 路由，放在最后
  {
    path: '/:pathMatch(.*)*',  // 匹配所有路径
    name: 'NotFound',
    component:  () => import("@/layout/404.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // 判断目标路由是否需要认证
  console.log("to",to);
  
  //console.log(`${to.path} noAuthToken ${to.meta.noAuthToken} roles ${to.meta.roles}`,to);
  if (to.meta.noAuthToken != true) {
    // 从 localStorage 或 sessionStorage 获取 token
    const token = UserInfoService.get()?.token;
     console.log("token",token);

    // 如果没有 token，则跳转到登录页面
    if (!token) {
      ElMessage.error("请先登录");
      next({ name: 'Login' })
      return;
    }
  } 

  if(to.meta.roles != undefined &&  !to.meta.roles.includes(UserInfoService.get().role) ){
    ElMessage.error("没有权限");
      next({ name: 'NotFound' })
      return;
  }

  
  next()  // 不需要认证的路由，直接访问
})

// 暴露模块路由数组
export { modulesRouters }; // 现在可以从其他地方导入使用 modulesRouters
export default router;
