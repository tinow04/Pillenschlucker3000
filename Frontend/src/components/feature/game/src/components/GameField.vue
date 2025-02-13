<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PacmanObject from "@/components/feature/game/src/components/PacmanObject.vue";

const position = ref({ left: 0, top: 0 });

function getPosition() {
  const pacmanIcon = document.getElementById('pacman-icon');
  if (pacmanIcon) {
    return pacmanIcon.getBoundingClientRect();
  }
  return null;
}

function yourFunction() {
  const rect = getPosition();
  if (rect) {
    console.log(`Pacman position - X: ${rect.left}, Y: ${rect.top}`);
    position.value.left = rect.left + 5;
    position.value.top = rect.top + 5;
  }
}

onMounted(() => {
  setInterval(() => {
    yourFunction();
  }, 10 * 60 * 10);
});
</script>

<template>
  <div id="game-field" class="game-field">
    <pacman-object id="pacman-icon" :style="{ left: position.left + 'px', top: position.top + 'px', position: 'absolute' }"></pacman-object>
  </div>
</template>

<style scoped>
.game-field {
  width: 50rem;
  height: 30rem;
  background-color: green;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>







<!--<script setup lang="ts">-->
<!--import { onMounted } from 'vue';-->
<!--import PacmanObject from "@/components/feature/game/src/components/PacmanObject.vue";-->

<!--function getPosition() {-->
<!--  const pacmanIcon = document.getElementById('pacman-icon');-->
<!--  if (pacmanIcon) {-->
<!--    const position = pacmanIcon.getBoundingClientRect();-->
<!--  }-->
<!--  return null;-->
<!--}-->



<!--function yourFunction() {-->
<!--  const rect = getPosition();-->
<!--  if (rect) {-->
<!--    console.log(`Pacman position - X: ${rect.left}, Y: ${rect.top}`);-->
<!--    position.value.left = rect.left + 5;-->
<!--    position.value.top = rect.top + 5;-->
<!--  }-->
<!--}-->

<!--onMounted(() => {-->
<!--  setInterval(() => {-->
<!--    yourFunction();-->
<!--  }, 1000 * 60 * 10);-->
<!--});-->
<!--</script>-->

<!--<template>-->

<!--  <div id="game-field" class="game-field">-->
<!--    <pacman-object id="pacman-icon"></pacman-object>-->
<!--  </div>-->

<!--</template>-->

<!--<style scoped>-->

<!--.game-field {-->
<!--  /* Add styles for your game field here */-->
<!--  width: 50rem;-->
<!--  height: 30rem;-->
<!--  background-color: green;-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--}-->

<!--</style>-->
