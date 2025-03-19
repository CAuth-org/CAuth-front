export default [
  {
    path: "/testUser",
    name: "testUser",
    component: () => import("@/views/testUser/index.vue"),
    meta: {
      title: "测试用户",
      icon: "HomeFilled",
      roles: ["user"], // you can set roles in root nav
      noShow: true, // you can set roles in root nav
    },
  },
  {
    path: "/testUser",
    name: "testUser",
    component: () => import("@/views/testUser/index.vue"),
    meta: {
      title: "测试用户1",
      icon: "HomeFilled",
      roles: ["user"], // you can set roles in root nav
      noShow: true, // you can set roles in root nav
    },
  },
];
