<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps } from "vue";

const props = defineProps<{ grid: number[][] }>();

const position = ref({ x: 20, y: 20 });
const speed = 5;
const keysPressed = new Set<string>();
const pacmanObject = ref<HTMLElement | null>(null);
const mazeWidth = 700;
const mazeHeight = 755;
const pacmanSize = 35;
const hitboxOffsetUp = -8;
const hitboxOffsetLeft = -8;

const canMoveTo = (x: number, y: number) => {
  const col = Math.floor((x - hitboxOffsetLeft) / 25);
  const row = Math.floor((y - hitboxOffsetUp) / 25);
  return props.grid[row] && props.grid[row][col] === 1;
};

const move = () => {
  if (keysPressed.has("ArrowUp") && position.value.y > 0 && canMoveTo(position.value.x, position.value.y - speed)) {
    position.value.y -= speed;
  }
  if (keysPressed.has("ArrowDown") && position.value.y < mazeHeight - pacmanSize && canMoveTo(position.value.x, position.value.y + speed + pacmanSize -15)) {
    position.value.y += speed;
  }
  if (keysPressed.has("ArrowLeft") && position.value.x > 0 && canMoveTo(position.value.x - speed, position.value.y)) {
    position.value.x -= speed;
  }
  if (keysPressed.has("ArrowRight") && position.value.x < mazeWidth - pacmanSize && canMoveTo(position.value.x + speed + pacmanSize -18, position.value.y)) {
    position.value.x += speed;
  }
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
  <div ref="pacmanObject" :style="{ left: position.x + 'px', top: position.y + 'px' }">
    <img class="pacman-img" src="@/assets/img_1.png" alt="Pacman Image">
  </div>
</template>

<style scoped>
.pacman-img {
  width: 35px;
  height: 35px;
}
</style>
