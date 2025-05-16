<script setup lang="ts">
  import { ref } from "vue";

  type Direction = 'up' | 'down' | 'left' | 'right' | null;

  const canMoveToDirections: Record<Direction, { x1: number; y1: number; x2: number; y2: number }> = {
    up:     { x1: -2.5,  y1: -5,    x2:  20,   y2: -5},
    down:   { x1: -2.5,  y1:  22.5, x2:  20,   y2:  22.5},
    left:   { x1: -5,    y1: -2.5,  x2: -5,    y2:  20},
    right:  { x1:  22.5, y1: -2.5,  x2:  22.5, y2:  20},
  };

  const moveToDirection: Record<Direction, { x: number; y: number }> = {
    up: { x: 0, y: -2.5 },
    down: { x: 0, y: 2.5 },
    left: { x: -2.5, y: 0 },
    right: { x: 2.5, y: 0 },
  };

  const directionToRotation: Record<Direction, number> = {
    up: -90,
    down: 90,
    left: 180,
    right: 0,
  };

  const props = defineProps<{ grid: number[][] }>();
  const pacmanGif = ref<HTMLElement | null>(null);
  const position = ref({ x: 20, y: 20 });
  const hitboxOffsetUp = -8;
  const hitboxOffsetLeft = -8;
  let currentDirection: Direction = null;
  let nextDirection: Direction = null;
  let lastMoveTime = 0;
  const moveInterval = 20;
  const emit = defineEmits(['update-grid']);

  const canMoveTo = (x: number, y: number) => {
    const col = Math.floor((x - hitboxOffsetLeft) / 25);
    const row = Math.floor((y - hitboxOffsetUp) / 25);
    return props.grid[row] && props.grid[row][col] >= 3;
  };

  function canMoveInDirection(dir: Direction, pos: { x: number, y: number }) {
    const vec = canMoveToDirections[dir];
    return canMoveTo(pos.x + vec.x1, pos.y + vec.y1) && canMoveTo(pos.x + vec.x2, pos.y + vec.y2);
  }

  function moveOverPoint(x: number, y: number):void {
    const col = Math.floor((x - hitboxOffsetLeft) / 25);
    const row = Math.floor((y - hitboxOffsetUp) / 25);
    if(props.grid[row] && props.grid[row][col] === 3){
      emit('update-grid', { row, col, value: 4 });
      //props.grid[row][col] = 4;
      console.log("Über Punkt gelaufen");
    }
    if(props.grid[row] && props.grid[row][col] === 5){
      emit('update-grid', { row, col, value: 6 });
      //props.grid[row][col] = 6;
      console.log("Über PowerUp gelaufen");
    }
  };

  function updatePacmanPosition() {
    // Ist nextDirection erlaubt?
    if (nextDirection && canMoveInDirection(nextDirection, position.value)) {
      currentDirection = nextDirection;
    }

    // Versuche, in currentDirection zu laufen
    if (currentDirection) {
      console.log(currentDirection);
      const vec = moveToDirection[currentDirection];
      const newX1 = position.value.x + (2 * vec.x);
      const newY1 = position.value.y + (2 * vec.y);
      const newX2 = position.value.x + (2 * vec.x) + 20;
      const newY2 = position.value.y + (2 * vec.y) + 20;

      const rotation = directionToRotation[currentDirection];
      pacmanGif.value.style.transform = `rotate(${rotation}deg)`;

      if (canMoveTo(newX1, newY1) && canMoveTo(newX2, newY2)) {
        moveOverPoint(newX1,newY1);
        position.value.x = newX1;
        position.value.y = newY1;
      } else {
        currentDirection = null;
      }
    }
  }

  function gameLoop(timestamp: number) {
    if (timestamp - lastMoveTime > moveInterval) {
      updatePacmanPosition();
      lastMoveTime = timestamp;
    }
    requestAnimationFrame(gameLoop);
  }

  const keyToDirection: Record<string, Direction> = {
    w: 'up',
    s: 'down',
    a: 'left',
    d: 'right',
  };

  window.addEventListener('keydown', (e) => {
    if (keyToDirection[e.key]) {
      nextDirection = keyToDirection[e.key];
    }
  });
  requestAnimationFrame(gameLoop);
</script>

<template>
  <div ref="pacmanObject" :style="{ left: position.x + 'px', top: position.y + 'px' }">
    <img class="pacman-gif" ref="pacmanGif" src="@/assets/PacManEating.gif" alt="Pacman gif">
  </div>
</template>

<style scoped>

  .pacman-gif {
    position:absolute;
    top: 0px;
    left: 0px;
    width: 35px;
    height: 35px;
    /* transition: transform 0.15s ease; */
    image-rendering: optimizeSpeed;
    image-rendering: -o-crisp-edges;
    image-rendering: pixelated;
    -ms-interpolation-mode: nearest-neighbor;
  }
</style>
