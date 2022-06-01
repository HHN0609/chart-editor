import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import DashBoard from "@/views/DashBoard.vue";
import NotFound from "@/views/NotFound.vue";
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: LoginPage,
    },
    {
      path: "/DashBoard",
      component: DashBoard,
    },
    {
      path: "/404",
      component: NotFound,
    },
  ],
});
