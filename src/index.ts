import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router/index";
import pinia from "@/stores/store";
import "ant-design-vue/dist/antd.css";
import "@/index.less";
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
