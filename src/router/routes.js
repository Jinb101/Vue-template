import { createRouter, createWebHistory } from "vue-router";

console.log(createRouter);
let prefix_title = "";
let after_title = "";

function routerObj(path, com, name, title, to = "", child) {
  let opt = {
    path: path,
    name: name,
    meta: {
      title: prefix_title + title + after_title,
      to: to,
      name: name,
      path: path,
    },
  };
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === "development") {
    opt.component = (resolve) => import(/* @vite-ignore */ `../view/${com}`);
  } else {
    opt.component = () =>
      import(/* @vite-ignore */ `../view/${com}`).then(
        (module) => module.default
      );
  }
  if (child !== undefined && child.length > 0) {
    opt.children = child;
  }
  return opt;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: {
        name: "start",
      },
    },
    // 将动态添加的路由配置对象添加到routes数组中
    routerObj("/start", "start/index.vue", "start", "首页"),
  ],
});

// 路由拦截，如果没有登录 则返回登录页面
// router.beforeEach((to, from, next) => {
//   console.log(router, VueR, router.routes);
// });

console.log(router.options.routes);

router.afterEach((route) => {
  // 从路由的元信息中获取 title 属性
  if (route.meta.title) {
    // document.title = route.meta.title;
    // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
    // if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    //   const hackIframe = document.createElement("iframe");
    //   hackIframe.style.display = "none";
    //   hackIframe.src =
    //     // eslint-disable-next-line no-undef
    //     process.env.NODE_ENV === "development"
    //       ? "../../../"
    //       : "./" + "utils/static/html/fixIosTitle.html?r=" + Math.random();
    //   document.body.appendChild(hackIframe);
    //   // eslint-disable-next-line no-unused-vars
    //   setTimeout((_) => {
    //     document.body.removeChild(hackIframe);
    //   }, 300);
    // }
  }
});

export default router;
