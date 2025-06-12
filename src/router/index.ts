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
      component: () => import('@/view/Convertor/index.vue')
    },
    {
      path:'/form',
      name:'form',
      component:() => import('@/view/form/index.vue')
    }
  ],
});

export default router;
