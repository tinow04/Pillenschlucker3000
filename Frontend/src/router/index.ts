import { createRouter, createWebHistory } from 'vue-router'
import GamePage from "@/components/feature/game/src/pages/GamePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GamePage,
    },
  ],
})

export default router
