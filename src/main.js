import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/routes";
import 'amfe-flexible'
// 请求 axios -  http
import http from "@/api/api.js";
//Pinia
import { createPinia } from "pinia";

// 工具类
import * as Tools from "@/utils/tools/index";
// 视图组件
import "tailwindcss/tailwind.css";
import "./style.css";

// app 实例
const app = createApp(App);

//  Pinia 实例
const pinia = createPinia();


app.provide("Tools", Tools);
app.provide("http", http);
app.use(pinia).use(router);
app.mount("#app");
