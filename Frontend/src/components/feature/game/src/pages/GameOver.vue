<script setup lang="ts">
import { useRouter } from 'vue-router';

  const props = defineProps<{
    score: number,
    highscore: number,
    level: number,
    ghostsEatenTotal: number,
    pointsEatenTotal: number
  }>();
  const emit = defineEmits(['restart']);
  const router = useRouter();

fetch('http://localhost:80/api/highscore', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    // Ihre Daten hier
    score: 100,
    playerName: 'Spieler1'
  })
})
  .then(response => response.json())
  .then(data => console.log('Erfolg:', data))
  .catch(error => console.error('Fehler:', error));

function goHome() {
  router.push('/');
}
</script>

<template>
    <div class="gameover-overlay">
        <div class="gameover-content">
            <h1>Game Over</h1>
            <p>Highscore: {{ highscore }}</p>
            <p>Points: {{ score }}</p>
            <p>Levels won: {{ level }}</p>
            <p>Ghosts eaten: {{ ghostsEatenTotal }}</p>
            <p>Pills swallowed: {{ pointsEatenTotal }}</p>
            <button class="button restart" @click="$emit('restart')">Restart</button>
            <button class="button home" @click="goHome">Home</button>
        </div>
    </div>
</template>

<style scoped>

.gameover-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gameover-content {
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  font-family: "Jersey 10", serif;
  padding: 3rem 5rem 7rem 5rem;
  border-radius: 2rem;
  text-align: center;
  box-shadow: 0 0 30px #000;
  background-color: #183446;
  min-width: 500px;
  min-height: 350px;
}

.gameover-content h1 {
  font-size: 5rem;
  margin-bottom: 3rem;
  letter-spacing: 2px;
  color: yellow;
}

.gameover-content p {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: white;
}

.button {
  position: absolute;
  display: inline-block;
  width: 40%;
  text-align: center;
  font-family: "Jersey 10", serif;
  font-size: 2.5rem;
  padding: 0.5rem 2rem;
  border-radius: 1rem;
  border: none;
  background-color: black;
  color: white;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
  transition: 0.2s ease-in-out;
  cursor: pointer;
  margin: 0;
}

.restart {
  right: 2rem;
  bottom: 2rem;
}

.home {
  left: 2rem;
  bottom: 2rem;
}

.button:hover {
  transform: scale(1.02);
  font-size: 2.7rem;
  background-color: #222;
}
</style>
