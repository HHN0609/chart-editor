import { createRouter, createWebHashHistory } from "vue-router";
const LoginPage = () => import("@/views/LoginPage.vue");
const DashBoard = () => import("@/views/DashBoard.vue");
const NotFound = () => import("@/views/NotFound.vue");
const HomePage = () => import("@/views/HomePage.vue");
const ProjectContainer = () => import("@/components/ProjectContainer.vue");
const InfoContainer = () => import("@/components/InfoContainer.vue");
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/Home",
    },
    {
      name: "Home",
      path: "/Home",
      component: HomePage,
      children: [
        {
          name: "MyProject",
          path: "/Home/MyProject",
          component: ProjectContainer,
        },
        {
          name: "MyProfile",
          path: "/Home/MyProfile",
          component: InfoContainer,
        },
      ],
    },
    {
      name: "Login",
      path: "/Login",
      component: LoginPage,
    },
    {
      name: "DashBoard",
      path: "/DashBoard",
      component: DashBoard,
    },
    {
      name: "404",
      path: "/404",
      component: NotFound,
    },
  ],
});
