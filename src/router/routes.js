import {
    createRouter,
    createWebHistory,
    createWebHashHistory,
} from "vue-router";

import page from './page';

const routeConfigurations = [
    // 动态添加的路由配置对象
    // { path: "/page",name: "page", component: "page/index.vue", metaObj:{...meta}},
    ...page,
];


const createRouteObject = ({ path, name, component, metaObj, children = [] }) => ({
    path,
    name,
    meta: { ...metaObj },
    component: () => import(`../view/${component}`).then((module) => module.default),
    ...(metaObj.keepAlive ? { meta: { keepAlive: true } } : {}),
    ...(children.length > 0 ? { children: children.map(createRouteObject) } : {}),
});

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
console.log(routes, router);
router.beforeEach((to, from, next) => {
    console.log(to, from);
    next();
});

router.afterEach((route) => {
    //   fixIosTitle();
});

// const fixIosTitle = () => {
//   if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {

// };
export default router;
