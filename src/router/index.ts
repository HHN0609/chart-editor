import { createRouter, createWebHashHistory } from "vue-router";
const LoginPage = () => import("@/views/LoginPage.vue");
const DashBoard = () => import("@/views/DashBoard.vue");
const NotFound = () => import("@/views/NotFound.vue");
const HomePage = () => import("@/views/HomePage.vue");
const ProjectPage = () => import("@/components/ProjectPage.vue");
const InfoPage = () => import("@/components/InfoPage.vue");
const ManagePage = () => import("@/components/Managepage.vue");
const router = createRouter({
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
          component: ProjectPage,
        },
        {
          name: "MyProfile",
          path: "/Home/MyProfile",
          component: InfoPage,
        },
        {
          name: "Manage",
          path: "/Home/Manage",
          component: ManagePage,
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

// router.beforeEach();
export default router;
