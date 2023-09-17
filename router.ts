import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeComponent from "@/components/HomeComponent.vue";
import LoginComponent from "@/components/LoginComponent.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/connect",
    name: "Connect",
    component: LoginComponent,
  },
  {
    path: "/home",
    name: "Home",
    component: HomeComponent,
  },
  { path: "/:catchAll(.*)", redirect: "/home" },
];

const router = createRouter({
  history: createWebHashHistory("/rasBot-webApp/"),
  routes,
});

export default router;
