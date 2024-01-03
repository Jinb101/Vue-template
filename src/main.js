import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/routes";
// 请求 axios -  http
import http from "@/api/api.js";
//Pinia
import { createPinia } from "pinia";
//ElementPlus
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// 工具类
import * as Tools from "@/utils/tools/index";
// 视图组件
import s_view from "@/components/in_view/s_view.vue";
import "element-plus/dist/index.css";
import "tailwindcss/tailwind.css";
import "./style.css";

// app 实例
const app = createApp(App);

//  Pinia 实例
const pinia = createPinia();

app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.provide("Tools", Tools);
app.provide("http", http);
app.component("s-view", s_view);
app.use(pinia).use(router);
app.mount("#app");
