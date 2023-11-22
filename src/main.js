import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/routes";
// vant
import { Button, Cell, Tabbar, TabbarItem } from "vant";
// 请求 axios -  http
import http from "@/api/api.js";

//Pinia
import { createPinia } from "pinia";
// 视图组件
import s_view from "@/components/in_view/s_view.vue";

// app 实例
const app = createApp(App);

//  Pinia 实例
const pinia = createPinia();

// 对象 挂载
app.config.globalProperties.$http = http;

app.use(Button);
app.use(Cell);
app.use(Tabbar);
app.use(TabbarItem);

app.mount("#app");
app.component("s-view", s_view);
app.use(pinia).use(router);
