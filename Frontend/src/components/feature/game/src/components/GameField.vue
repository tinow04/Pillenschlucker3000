<script setup lang="ts">
import Points from "@/components/feature/game/src/components/Points.vue";
import PowerUp from "@/components/feature/game/src/components/PowerUp.vue";
import PacmanObject from "@/components/feature/game/src/components/PacmanObject.vue";
import { ref, onMounted, onUnmounted } from "vue";

const position = ref({ x: 200, y: 400 });
const speed = 5;
const keysPressed = new Set<string>();

const move = () => {
  if (keysPressed.has("ArrowUp")) position.value.y -= speed;
  if (keysPressed.has("ArrowDown")) position.value.y += speed;
  if (keysPressed.has("ArrowLeft")) position.value.x -= speed;
  if (keysPressed.has("ArrowRight")) position.value.x += speed;
};

const keyDownHandler = (event: KeyboardEvent) => {
  keysPressed.add(event.key);
};
const keyUpHandler = (event: KeyboardEvent) => {
  keysPressed.delete(event.key);
};


const gameLoop = () => {
  move();
  requestAnimationFrame(gameLoop);
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
  <div id="game-field" class="game-field">
    <pacman-object class="pacman"
      :style="{ left: position.x + 'px', top: position.y + 'px' }"
    ></pacman-object>
    <points></points>
    <power-up></power-up>
  </div>
</template>

<style scoped>
.game-field {
  width: 800px;
  height: 480px;
  background-color: green;
  position: relative;
}

.pacman {
  position: absolute;
}
</style>
