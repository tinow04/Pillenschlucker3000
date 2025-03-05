import { createRouter, createWebHistory } from 'vue-router'
import GamePage from "@/components/feature/game/src/pages/GamePage.vue";
import homePage from '@/components/feature/home/src/pages/homePage.vue';

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
  ],
})

export default router
