<script setup lang="ts">
  import { computed } from 'vue';
  import PacmanObject from './PacmanObject.vue';
  import PacmanPoints from './PacmanPoints.vue';
import PacmanPowerUp from './PacmanPowerUp.vue';

  const grid = [
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
  ];

  /*
  const highlightedCells = computed(() => {
    return grid.flatMap((row, rowIndex) =>
      row.map((cell, colIndex) => (cell === 3 ? { row: rowIndex, col: colIndex } : null))
    ).filter((cell): cell is { row: number, col: number } => cell !== null);
  });
  */
  const showPoints = computed(() => {
    return grid.flatMap((row, rowIndex) =>
      row.map((cell, colIndex) => (cell === 3 ? { row: rowIndex, col: colIndex } : null))
    ).filter((cell): cell is { row: number, col: number } => cell !== null);
  });

  const showPowerUp = computed(() => {
    return grid.flatMap((row, rowIndex) =>
      row.map((cell, colIndex) => (cell === 5 ? { row: rowIndex, col: colIndex } : null))
    ).filter((cell): cell is { row: number, col: number } => cell !== null);
  });


  

</script>

<template>
  <body id="game-field" class="game-field">
    <div class="pacman-container">
      <img class="pacman-maze" src="@/assets/PacManMaze.png">
      <PacmanObject class="pacman" :grid="grid"></PacmanObject>
      <!-- <div v-for="cell in highlightedCells" class="highlight" :style="{ gridRow: cell.row + 1, gridColumn: cell.col + 1 }"></div> -->
      <div v-for="cell in showPoints" class="showPoints" :style="{ gridRow: cell.row + 1, gridColumn: cell.col + 1 }">
        <PacmanPoints></PacmanPoints>
      </div>
      <div v-for="cell in showPowerUp" class="showPowerUp" :style="{ gridRow: cell.row + 1, gridColumn: cell.col + 1 }">
        <PacmanPowerUp></PacmanPowerUp>
      </div>
    </div>
  </body>
</template>

<style scoped>
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

</style>
