<script setup lang="ts">

  import { onMounted, onUnmounted } from "vue";

  const gameLoop = () => {
    requestAnimationFrame(gameLoop);
  };

  const keyDownHandler = (event: KeyboardEvent) => {
    keysPressed.add(event.key);
  };
  const keyUpHandler = (event: KeyboardEvent) => {
    keysPressed.delete(event.key);
  };

  onMounted(() => {
    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);
    requestAnimationFrame(gameLoop);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", keyDownHandler);
    window.removeEventListener("keyup", keyUpHandler);
  });

</script>

<template>
  <div class="pacman-container" ref="imagePacman">
    <img class="pacman-img" src="@/assets/img.png" alt="Pacman Image">
  </div>
</template>

<style scoped>
  .pacman-container {
    position: absolute;
    width: 35px;
    height: 35px;
  }

  .pacman-img {
    position:absolute;
    top: 0px;
    left: 0px;
    width: 35px;
    height: 35px;
    image-rendering: optimizeSpeed;
    image-rendering: -o-crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: pixelated;
    -ms-interpolation-mode: nearest-neighbor;
  }

</style>
