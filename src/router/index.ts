import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import DashBoard from "@/views/DashBoard.vue";
import NotFound from "@/views/NotFound.vue";
import HomePage from "@/views/HomePage.vue";
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/Login",
      component: LoginPage,
    },
    {
      path: "/",
      alias: "/Home",
      component: HomePage,
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
