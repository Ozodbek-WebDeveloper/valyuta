import { createRouter, createWebHistory } from "vue-router";
//
// import Header from "@/components/header.vue";
//
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "/",
      component: () => import("@/components/converter.vue"),
    },
    {
      path:'/form',
      name:'form',
      component:() => import('@/components/form.vue')
    }
  ],
});

export default router;
