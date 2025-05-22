<script setup lang="ts">
  import { ref,computed,onMounted } from 'vue';
  import PacmanObject from './PacmanObject.vue';
  import PacmanPoints from './PacmanPoints.vue';
  import PacmanPowerUp from './PacmanPowerUp.vue';
  import Ghost from './Ghosts.vue';
  import type { ComponentPublicInstance } from 'vue';
  import Blinky from '@/assets/Blinky.png'; //Error kann durch Entwicklungsumgebung kann angezeigt werden -> env.d.ts öffnen und er ist weg
  import Pinky from '@/assets/Pinky.png';  //Kann trotzdem gestartet werden und funktionieren
  import Inky from '@/assets/Inky.png';
  import Clyde from '@/assets/Clyde.png';

  type GhostInstance = ComponentPublicInstance<{ updateGhostPosition: () => void; position: { x: number, y: number } }>;

  const score = ref(0);
  const gameOver = ref(false);
  let pointsEaten : number = 0;
  let numberOfPoints : number = 0;

  const ghosts = [
    { id: 1, startPosition: { x: 345, y: 310 }, image: Blinky },   
    { id: 2, startPosition: { x: 345, y: 350 }, image: Pinky },    
    { id: 3, startPosition: { x: 320, y: 310 }, image: Inky },     
    { id: 4, startPosition: { x: 320, y: 350 }, image: Clyde }
  ]   

  const pacmanRef = ref();
  const ghostRefs = ref<GhostInstance[]>([]);

  let lastMoveTime = 0;
  const moveInterval = 25;

  const grid = ref([
  // 1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //1
    [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0], //2
    [0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0], //3
    [0, 5, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 5, 0], //4
    [0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0], //5
    [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0], //6
    [0, 3, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 3, 0], //7
    [0, 3, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 3, 0], //8
    [0, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 0], //9
    [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0], //10
    [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0], //11
    [0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0], //12
    [0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 2, 2, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0], //13
    [0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 2, 2, 2, 2, 2, 2, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0], //14
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 2, 2, 2, 2, 2, 2, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], //15
    [0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 2, 2, 2, 2, 2, 2, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0], //16
    [0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0], //17
    [0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0], //18
    [0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0], //19
    [0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0], //20
    [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0], //21
    [0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0], //22
    [0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0], //23
    [0, 5, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 5, 0], //24
    [0, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 0], //25
    [0, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 0], //26
    [0, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 0], //27
    [0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0], //28
    [0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0], //29
    [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0], //30
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //31
  //[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //32
  ]);

  /*
  const highlightedCells = computed(() => {
    return grid.flatMap((row, rowIndex) =>
      row.map((cell, colIndex) => (cell === 3 ? { row: rowIndex, col: colIndex } : null))
    ).filter((cell): cell is { row: number, col: number } => cell !== null);
  });
  */
  const showPoints = computed(() => {
    return grid.value.flatMap((row, rowIndex) =>
      row.map((cell, colIndex) => (cell === 3 ? { row: rowIndex, col: colIndex } : null))
    ).filter((cell): cell is { row: number, col: number } => cell !== null);
  });

  const showPowerUp = computed(() => {
    return grid.value.flatMap((row, rowIndex) =>
      row.map((cell, colIndex) => (cell === 5 ? { row: rowIndex, col: colIndex } : null))
    ).filter((cell): cell is { row: number, col: number } => cell !== null);
  });

  function gameLoop(timestamp: number) {
    if (gameOver.value) return;

    checkPoints();
 
    if (timestamp - lastMoveTime > moveInterval) {
      pacmanRef.value?.updatePacmanPosition();
      ghostRefs.value.forEach(ref => {
      ref?.updateGhostPosition();
      });

    const pacmanPos = pacmanRef.value?.position;
    for (const ref of ghostRefs.value) {
      if (ref && pacmanAndGhostCollide(pacmanPos, ref.position)) {
        gameOver.value = true;
        console.log('Game Over! Pacman wurde vom Geist gefangen.');
        return; 
      }
    }

    lastMoveTime = timestamp;
    }
    requestAnimationFrame(gameLoop);
    } onMounted(() => {
      const waitForRefs = setInterval(() => {
    if (pacmanRef.value && ghostRefs.value) {
      clearInterval(waitForRefs);
      requestAnimationFrame(gameLoop);
      countPointsInGrid(grid.value);
    }
  }, 10);
  });

  function pacmanAndGhostCollide(pos1, pos2) {
    const pacmanCol = Math.floor(pos1.x / 25);
    const pacmanRow = Math.floor(pos1.y / 25);
    const ghostCol = Math.floor(pos2.x / 25);
    const ghostRow = Math.floor(pos2.y / 25);
    return pacmanCol === ghostCol && pacmanRow === ghostRow;
  }


  function updateGrid({ row, col, value }) { 
    grid.value[row][col] = value;
    if(value == 4||value ==6){
      updatePoints(value);
    }
  }

  function updatePoints(value){
    if(value==4){
      score.value += 10;
      pointsEaten ++;
    } else {
      score.value += 50;
      pointsEaten ++;
    }
  }

  function checkPoints(){
    if(pointsEaten >= numberOfPoints){
      resetPoints(grid.value);
    }
  }

  function resetPoints(grid: number[][]){
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === 4) {
         grid[row][col] = 3;
        } else if (grid[row][col] === 6) {
          grid[row][col] = 5;
        }
      }
    }
    pointsEaten = 0;
  }

  function countPointsInGrid(grid: number[][]) {
    let count3 = 0;
    let count5 = 0;

    for (const row of grid) {
        for (const cell of row) {
            if (cell === 3) count3++;
            if (cell === 5) count5++;
        }
    }

    const total = count3 * 10 + count5 * 50;
    console.log(count3, count5, total);
    numberOfPoints = count3 + count5;
  }

</script>

<template>
  <body id="game-field" class="game-field">
  <div class="game-wrapper">
    <div class="score-display">
     Punkte: {{ score }}
    </div>
    <div class="pacman-container">
      <img class="pacman-maze" src="@/assets/PacManMaze.png">
      <PacmanObject ref="pacmanRef" class="pacman" :grid="grid" @update-grid="updateGrid"></PacmanObject>
      <Ghost
        v-for="(ghost, index) in ghosts"
        :key="ghost.id"
        ref="ghostRefs"
        class="ghost"
        :ghost-index="index"
        :start-position="ghost.startPosition"
        :image="ghost.image"
        :grid="grid"
        @update-grid="updateGrid"
      />
      <div v-for="(cell, index) in showPoints" :key="`point-${index}`" class="showPoints" :style="{ gridRow: cell.row + 1, gridColumn: cell.col + 1 }">
        <PacmanPoints></PacmanPoints>
      </div>
      <div v-for="(cell, index) in showPowerUp" :key="`powerup-${index}`" class="showPowerUp" :style="{ gridRow: cell.row + 1, gridColumn: cell.col + 1 }">
        <PacmanPowerUp></PacmanPowerUp>
      </div>
    </div>
  </div>  
  </body>
</template>

<style scoped>
  .game-wrapper {
  display: grid;
  grid-template-rows: auto 1fr;
  justify-items: center; /* Zentriert Score und Grid */
  align-items: start;
  }

  .game-field {
    background-color: black;
  }

  .pacman-maze {
    width: 700px;
    height: 775px;
    margin: 0;
    padding: 0;
    image-rendering: auto;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    background-color: black;
  }

  .pacman-container {
    position: relative;
    display: grid;
    grid-template-columns: repeat(28, 25px);
    grid-template-rows: repeat(31, 25px);
   /* border: 1px solid red; */
  }

  .highlight {
    background-color: yellow;
    opacity: 0.2;
  }

  .pacman{
    position: absolute;
  }

  .ghost{
    position: absolute;
  }

  .showPoints {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .showPowerUp {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .score-display {
    display: flex;
    width: 100%;
    font-size: 3rem;         
    font-weight: bold;
    color: white;          
    margin-bottom: 20px;     
    letter-spacing: 2px;
    background-color: black;
  }

</style>
