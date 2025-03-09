import { createRouter, createWebHistory } from 'vue-router'
import GamePage from "@/components/feature/game/src/pages/GamePage.vue";
import HomePage from "@/components/feature/home/src/pages/HomePage.vue";
import LoginPage from "@/components/feature/login/src/pages/LoginPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/game',
      name: 'game',
      component: GamePage,
    },
  ],
})

export default router
