<template>
  <div class="main-container">
    <div class="button-container">
      <ButtonComponent label="HOME" class-name="Home-Button" @click="switchPageHome" />
    </div>
    <div class="grid-wrapper">
      <SkinsComponent />
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from '../components/Button.vue'
import SkinsComponent from '../components/Skins.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/piniaStore'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'LockerComponent',
})

const router = useRouter();
const userStore = useUserStore();
const playerId = userStore.userId;
const coins = ref(30000);
const price: number = 1000;

function switchPageHome() {
  router.push('/')
}

const fetchCoins = async () => {
  if (!playerId) {
    console.log('Player ID fehlt. Coins kann nicht abgefragt werden.')
    return
  }
  console.log('Coins abgerufen')
  try {
    const response = await fetch(`http://localhost/api/shop?playerID=${playerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
    }

    const coins = await response.json()

    console.log('Coins:', coins)
    return coins
  } catch (error) {
    console.error('Fehler beim Abrufen der Coins:', error)
  }
}

const updateCoins = async (skinPrice: number) => {
  if (!playerId && !coins.value) {
    console.log('Player ID is not set or no coins. Cannot update coins.')
    return
  }
  try {
    const response = await fetch('http://localhost/api/shop', {
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
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
    }
    coins.value = await response.json()
    console.log('Coins updated successfully. New Coins:', coins.value)
  } catch (error) {
    console.error('Error updating coins :', error)
  }
}

onMounted(() => {
  fetchCoins().then((playerCoins) => {
    coins.value = playerCoins;
    updateCoins(price);
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

.button-container {
  height: calc(100vh - 80vh);
  min-height: 80px;
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
</style>
