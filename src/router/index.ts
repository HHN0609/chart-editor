import { createRouter, createWebHashHistory } from "vue-router";
// import userInfo from "@/stores/userInfo";
// import pinia from "@/stores/store";
// import { getCookie } from "@/utils";
const LoginPage = () => import("@/views/LoginPage.vue");
const DashBoard = () => import("@/views/DashBoard.vue");
const NotFound = () => import("@/views/NotFound.vue");
const HomePage = () => import("@/views/HomePage/HomePage.vue");
const Display = () => import("@/views/Display.vue");
const ProjectPage = () => import("@/views/HomePage/ProjectPage.vue");
const InfoPage = () => import("@/views/HomePage/InfoPage.vue");
const ManagePage = () => import("@/views/HomePage/ManagePage.vue");

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
          path: "",
          redirect: {
            name: "MyProject",
          },
        },
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
      path: "/DashBoard/:projectId",
      component: DashBoard,
      beforeEnter: (to) => {
        if (!to.params.projectId) {
          return false;
        } else {
          return true;
        }
      },
    },
    {
      name: "Display",
      path: "/Display/:projectId",
      component: Display,
      beforeEnter: (to) => {
        if (!to.params.projectId) {
          return false;
        } else {
          return true;
        }
      },
    },
    {
      name: "404",
      path: "/404",
      component: NotFound,
    },
    {
      path: "/:catchAll(.*)",
      redirect: {
        name: "404",
      },
    },
  ],
});

export default router;
