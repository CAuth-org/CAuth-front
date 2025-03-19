export default {
    path: "/testAdmin",
    // name: "testAdmin",
    // component: () => import("@/views/testAdmin/index.vue"), // 如果有子路由，则不需要设置component
    meta: {
      title: "testadmin",
      icon: "HomeFilled",
      roles: ["admin"], // you can set roles in root nav
      noShow: true, // you can set roles in root nav
    },
    children : [
        {
            path: "/testAdmin/testAdminChildren",
            name: "testAdminChildren",
            component: () => import("@/views/testAdmin/children1.vue"),
            meta:{
                title: "testAdminChildren2",
                icon: "HomeFilled",
                roles: ["admin"], // you can set roles in root nav
                noShow: true, // you can set roles in root nav
            }
        },
        {
            path: "/testAdmin/testAdmin",
            name: "testAdmin",
            component: () => import("@/views/testAdmin/index.vue"),
            meta:{
                title: "testAdminChildren1",
                icon: "HomeFilled",
                roles: ["admin"], // you can set roles in root nav
                noShow: true, // you can set roles in root nav
            }
        }
    ]
  };