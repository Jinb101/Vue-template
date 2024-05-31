import {
    createRouter,
    createWebHistory,
    createWebHashHistory,
} from "vue-router";

import page from './page';

const routeConfigurations = [
    // 动态添加的路由配置对象
    // { path, component, name, title, isTab, hasHeader, type, keepAlive, to, children }
    // { path: "/page", component: "page/index.vue", name: "page",{metaObj}},
    ...page,
];


const createRouteObject = ({
    path,
    name,
    metaObj
}) => ({
    path,
    name,
    meta: {
        ...metaObj
    },
    component: () =>
        import(
            /* @vite-ignore */
            `${isComponentPath(component) ? "../" : "../view/"}${component}`
        ).then((module) => module.default),
    ...(keepAlive ? { meta: { keepAlive: true } } : {}),
    ...(children ? { children: children.map(createRouteObject) } : {}),
});



const isComponentPath = (path) => path.startsWith("components");

const routes = routeConfigurations.map(createRouteObject);
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            redirect: "/home",
        },
    ],
});

routes.forEach((route) => router.addRoute(route));

router.beforeEach((to, from, next) => {

});

router.afterEach((route) => {
    //   fixIosTitle();
});

// const fixIosTitle = () => {
//   if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {

// };
export default router;
