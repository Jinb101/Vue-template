import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/routes";
// 移动适配
import 'amfe-flexible'
// 视图 css
import "tailwindcss/tailwind.css";
import "./style.css";
//  vant
import "vant/lib/index.css";
import Vant from "vant";
// 请求 axios -  http
import http from "@/api/api.js";
//Pinia
import { createPinia, storeToRefs } from "pinia";
import { useStore } from "@/store/index.js";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// 个人配置 实例对象
import { userConfig } from "@/utils/config/user.config.js";
// wxsdk
import wx from "weixin-jsapi";
import loading from '@/utils/tools/loading.js';
// app 实例
const app = createApp(App);
//  Pinia 实例
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

const mainStor = useStore();
const PiniaStor = storeToRefs(mainStor);
//
// app.provide("xxx", xxx);
// app.config.globalProperties.xxx = xxx
app.provide("http", http);
app.provide("stor", useStore);
app.provide("$wxApi", wx);
app.provide("$loading", {
    open: loading.open,
    close: loading.close,
});


// 全局组件挂载 还需 在 vite.config.js 中配置 compilerOptions
// app.component('xxxx', xxxx)


app.use(router)
app.mount("#app");
