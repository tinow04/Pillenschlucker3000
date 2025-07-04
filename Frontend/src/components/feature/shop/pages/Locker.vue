<template>
  <div class="main-container">
    <div class="header-container">
      <div class="coins-container">
        <template v-if="coins !== null">
          <img src='@/assets/PNGs/Coins%20Overlay.png' class="coin-image" alt="Coins">
          <span class="coin-amount">{{ coins }}</span>
        </template>
        <template v-else>
          Coins werden geladen...
        </template>
      </div>
      <div class="button-container">
        <Home />
      </div>
    </div>
    <div class="grid-wrapper">
      <SkinsComponent
        @updateCoins="
        (price, done) => {
          updateCoins(price)
          .then(success => done(success))
          .catch(()   => done(false))
        }
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SkinsComponent from '../components/Skins.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/piniaStore';
import { onMounted, ref } from 'vue';
import Home from "@/components/feature/login/src/components/Home.vue";


defineOptions({
  name: 'LockerComponent',
});

const router = useRouter();
const userStore = useUserStore();
const playerId = userStore.userId;
const coins = ref<number | null>(null);

function switchPageHome() {
  router.push('/');
}

const fetchCoins = async () => {
  if (!playerId) {
    console.log('Player ID fehlt. Coins kann nicht abgefragt werden.');
    return;
  }
  console.log('Coins abgerufen');
  try {
    const response = await fetch(import.meta.env.VITE_BASE_URL + `api/shop?playerID=${playerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const coins = await response.json();

    console.log('Coins:', coins);
    return coins;
  } catch (error) {
    console.error('Fehler beim Abrufen der Coins:', error);
  }
}

const updateCoins = async (skinPrice: number): Promise<boolean> => {
  if (!playerId || !coins.value) {
    console.log('Player ID is not set or no coins. Cannot update coins.');
    return false;
  }
  if (coins.value < skinPrice) {
    console.log('Not enough coins to purchase skin.');
    return false;
  }
  try {
    const response = await fetch(import.meta.env.VITE_BASE_URL + `api/shop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        playerID: playerId,
        coins: coins.value,
        price: skinPrice,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      return false;
    }
    coins.value = await response.json();
    console.log('Coins updated successfully. New Coins:', coins.value);
    return true;
  } catch (error) {
    console.error('Error updating coins :', error);
    return false;
  }
}

onMounted(() => {
  fetchCoins().then((playerCoins) => {
    coins.value = playerCoins;
  });
})
</script>

<style>
::-webkit-scrollbar {
  display: none;
}

.main-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  height: calc(100vh - 80vh);
  min-height: 80px;
}

.coins-container {
  display: flex;
  align-items: center;
  height: 4.5rem;
  font-size: 1.5rem;
  font-family: "Jersey 10", serif;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 0 1rem;
  border-radius: 0.75rem;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
}

.coin-amount {
  color: gold;
  font-weight: bold;
}

.grid-wrapper {
  height: calc(100vh - 20vh);
  overflow-y: scroll;
  overflow-x: hidden;
}

@media (max-width: 1366px) {
  .button-container {
    height: calc(100vh - 87vh);
  }

  .grid-wrapper {
    height: calc(100vh - 13vh);
    overflow-y: auto;
    overflow-x: hidden;
  }
}

.coin-amount {
  font-family: "Jersey 10", serif;
  font-size: 24px;
  letter-spacing: 1px;
}

.coin-image {
  height: 1.8rem;
  width: auto;
  margin-right: 0.5rem;
  display: inline-block;
  vertical-align: middle;
}

.coins-container:hover {
  transform: scale(1.05);
  box-shadow: 0 0 12px rgba(255, 215, 0, 0.5);
}

@media (max-width: 1366px) {
  .coins-container {
    padding: 0.4rem 0.8rem;
    font-size: clamp(1.3rem, 2vw, 2.2rem);
  }
}

@media (max-width: 1024px) {
  .coins-container {
    padding: 0.3rem 0.6rem;
    font-size: clamp(1.1rem, 1.8vw, 1.8rem);
  }
}

@media (max-width: 800px) {
  .coins-container {
    padding: 0.25rem 0.5rem;
    font-size: clamp(1rem, 1.5vw, 1.5rem);
  }
}

</style>
