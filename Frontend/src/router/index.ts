import { createRouter, createWebHistory } from 'vue-router'
import GamePage from "../components/feature/game/src/pages/GamePage.vue";
import HomePage from '../components/feature/home/src/pages/HomePage.vue';
import LoginPage from '../components/feature/login/src/pages/LoginPage.vue';
import PacmanShopPage from '../components/feature/pacmanShop/pages/PacmanShopPage.vue';
import LockerPacman from '../components/feature/newPacmanShop/pages/LockerPacman.vue';

const routes = [
  { path: '/', component: HomePage},
  { path: '/login', component: LoginPage },
  { path: '/ingame', component: GamePage },
  { path: '/pacmanShop', component: PacmanShopPage},
  { path: '/locker', component: PacmanShopPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
