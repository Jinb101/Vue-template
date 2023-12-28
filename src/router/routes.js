import { createRouter, createWebHistory } from "vue-router";

console.log(createRouter);
let prefix_title = "";
let after_title = "";

const routesConfig = [
  // 动态添加的路由配置对象
  // path, component,name,title,footer,header,header_right
  //   ["/page", "page/index.vue", "page", "首页", false, false],
];

const toRoute = ([
  path,
  component,
  name,
  title,
  isTab,
  hasHeader,
  type,
  keepAlive,
  to,
  children,
]) => ({
  path,
  name,
  meta: {
    title: prefix_title + title + after_title,
    to: to ?? "",
    name,
    type: type ?? "farm",
    tab: isTab ?? false,
    hea: hasHeader ?? true,
  },
  component: () =>
    import(
      /* @vite-ignore */
      `${component.startsWith("components") ? "../" : "../view/"}${component}`
    ).then((module) => module.default),
  ...(keepAlive ? { meta: { keepAlive: true } } : {}),
  ...(children ? { children: children.map(toRoute) } : {}),
});

const routes = routesConfig.map(toRoute);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/page",
    },
    {
      name: "page",
      path: "/page",
      component: () => import("@/view/page/index.vue"),
    },
  ],
});

routes.forEach((route) => router.addRoute(route));

//   router.beforeEach((to, from, next) => {

//   });

router.afterEach((route) => {
  // if (route.meta.title) {
  //   document.title = route.meta.title;
  //   if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
  //     const hackIframe = document.createElement("iframe");
  //     hackIframe.style.display = "none";
  //     hackIframe.src =
  //       process.env.NODE_ENV === "development"
  //         ? "../../../"
  //         : "./" + "utils/static/html/fixIosTitle.html?r=" + Math.random();
  //     document.body.appendChild(hackIframe);
  //     setTimeout((_) => {
  //       document.body.removeChild(hackIframe);
  //     }, 300);
  //   }
  // }
});

export default router;
