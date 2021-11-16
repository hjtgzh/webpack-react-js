module.exports = {
  // loadingComponent: "@/components/Loading", // 路由按需加载 loading组件
  // noAuthShow: "@/components/NoAuth", // 无权限展示效果
  routes: [
    // {
    //   path: "/404", // 路径
    //   code: "44", // 唯一code，权限校验用，无code代办无权限
    //   exact: true, // 是否精确匹配
    //   dynamic: false, // 是否懒加载
    //   component: "@/pages/Error",
    // },
    {
      path: "/",
      // component: "@/layouts/BasicLayout",
      dynamic: false,
      routes: [
        {
          name: "数据开发",
          path: "/home",
          // component: "@/layouts/Processing",
          routes: [
            {
              name: '首页',
              path: '/processing/analysis',
              component: '@/pages/home',
            },
          ],
        },
      ],
    },
  ],
};
