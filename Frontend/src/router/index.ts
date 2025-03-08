import { createRouter, createWebHistory } from 'vue-router'
import GamePage from "@/components/feature/game/src/pages/GamePage.vue";
import homePage from '@/components/feature/home/src/pages/homePage.vue';
import loginPage from "@/components/feature/login/src/pages/loginPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage,
    },
    {
      path: '/game',
      name: 'game',
      component: GamePage,
    },
    {
      path: '/login',
      name: 'login',
      component: loginPage,
    },
  ],
})

export default router
