import { createRouter, createWebHistory } from 'vue-router'
import GamePage from "../components/feature/game/src/pages/GamePage.vue";
import HomePage from '../components/feature/home/src/pages/HomePage.vue';
import LoginPage from '../components/feature/login/src/pages/LoginPage.vue';

const routes = [
  { path: '/', component: HomePage},
  { path: '/login', component: LoginPage },
  { path: '/game', component: GamePage },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
