<script setup lang="ts">
  import { ref,computed,onMounted } from 'vue';
  import PacmanObject from './PacmanObject.vue';
  import PacmanPoints from './PacmanPoints.vue';
  import PacmanPowerUp from './PacmanPowerUp.vue';
  import GameOver from '@/components/feature/game/src/pages/GameOver.vue';
  import Ghost from './Ghosts.vue';
  import type { ComponentPublicInstance } from 'vue';
  import Blinky from '@/assets/Blinky.png'; //Error kann durch Entwicklungsumgebung kann angezeigt werden -> env.d.ts öffnen und er ist weg
  import Pinky from '@/assets/Pinky.png';  //Kann trotzdem gestartet werden und funktionieren
  import Inky from '@/assets/Inky.png';
  import Clyde from '@/assets/Clyde.png';
  import VulnerableGhost from '@/assets/Vulnerable.png';

  type GhostInstance = ComponentPublicInstance<{
    updateGhostPosition: () => void;
    position: { x: number, y: number };
    resetPosition: (startPosition: { x: number, y: number }) => void;
    setVulnerable: (state: boolean) => void;
    isVulnerable: () => boolean;  
  }>;

  const isGameStarted = ref(false);
  const areGhostsPaused = ref(false);

  const score = ref(0);
  const highscore = ref(0);
  const lives = ref(3);
  const invulnerable = ref(false);
  const gameOver = ref(false);
  const level = ref(0);
  const pointsEatenTotal = ref(0);
  const ghostsEatenTotal = ref(0);

  let pointsEaten : number = 0;
  let numberOfPoints : number = 0;
  let powerUp: boolean = false;
  let ghostsEaten : number = 0;
  let timeoutId: number | undefined;

  interface FloatingScore {
    x: number;
    y: number;
    value: number;
    id: number;
  }

  const floatingScores = ref<FloatingScore[]>([]);
  let floatingScoreId = 0;

  interface GhostData {
    id: number;
    startPosition: { x: number, y: number };
    image: any;
  }

  const ghosts = ref<GhostData[]>([
    { id: 1, startPosition: { x: 345, y: 310 }, image: Blinky },   
    { id: 2, startPosition: { x: 345, y: 350 }, image: Pinky },    
    { id: 3, startPosition: { x: 320, y: 310 }, image: Inky },     
    { id: 4, startPosition: { x: 320, y: 350 }, image: Clyde }
  ]);
  
  const pacmanStartPosition = { x: 330, y: 570 };

  const pacmanRef = ref();
  const ghostRefs = ref<GhostInstance[]>([]);

  let lastMoveTime = 0;
  const moveInterval = 25;

  const grid = ref([ //0 = Wand, 2 = Geisterspawn, 3 = Punkt, 4 = gegessener Punkt, 5 = PowerUp, 6 = gegessener PowerUp, 9 = Weg(kein Punkt)
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
    [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 9, 0, 0, 9, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0], //10
    [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 9, 0, 0, 9, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0], //11
    [0, 0, 0, 0, 0, 0, 3, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 3, 0, 0, 0, 0, 0, 0], //12
    [0, 0, 0, 0, 0, 0, 3, 0, 0, 9, 0, 0, 0, 2, 2, 0, 0, 0, 9, 0, 0, 3, 0, 0, 0, 0, 0, 0], //13
    [0, 0, 0, 0, 0, 0, 3, 0, 0, 9, 0, 2, 2, 2, 2, 2, 2, 0, 9, 0, 0, 3, 0, 0, 0, 0, 0, 0], //14
    [9, 9, 9, 9, 9, 9, 3, 9, 9, 9, 0, 2, 2, 2, 2, 2, 2, 0, 9, 9, 9, 3, 9, 9, 9, 9, 9, 9], //15
    [0, 0, 0, 0, 0, 0, 3, 0, 0, 9, 0, 2, 2, 2, 2, 2, 2, 0, 9, 0, 0, 3, 0, 0, 0, 0, 0, 0], //16
    [0, 0, 0, 0, 0, 0, 3, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 3, 0, 0, 0, 0, 0, 0], //17
    [0, 0, 0, 0, 0, 0, 3, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 3, 0, 0, 0, 0, 0, 0], //18
    [0, 0, 0, 0, 0, 0, 3, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 3, 0, 0, 0, 0, 0, 0], //19
    [0, 0, 0, 0, 0, 0, 3, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 3, 0, 0, 0, 0, 0, 0], //20
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

  function startGame() {
    isGameStarted.value = true;
  }

  function gameLoop(timestamp: number) {
    if (gameOver.value) return;

    checkPoints();
    if (timestamp - lastMoveTime > moveInterval) {
      pacmanRef.value?.updatePacmanPosition();
      if(isGameStarted.value&& !areGhostsPaused.value){
        ghostRefs.value.forEach(ref => {
        ref?.updateGhostPosition();
        });
      }

    if (checkCollisionAndHandle()) {
      return;
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
      console.log("Game Start!");
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

  function checkCollisionAndHandle(): boolean {
    const pacmanPos = pacmanRef.value?.position;
    for (let idx = 0; idx < ghostRefs.value.length; idx++) {
      const ref = ghostRefs.value[idx];
      if (ref && pacmanAndGhostCollide(pacmanPos, ref.position)) {
        if(powerUp  && ref.isVulnerable()){
          eatGhost(idx);
          ref.setVulnerable(false);
        } else{
          if (!invulnerable.value) {
            if (lives.value === 0) {
              gameOver.value = true;
              if(highscore.value < score.value){
                highscore.value = score.value;
              }
              console.log('Game Over! Pacman wurde vom Geist gefangen.');
              return true; // Game Over, Gameloop soll abbrechen
            }
            lives.value = lives.value - 1;
            invulnerable.value = true;
            areGhostsPaused.value = true;
            floatingScores.value = [];
            setTimeout(() => {
              areGhostsPaused.value = false;
              invulnerable.value = false;
            }, 3000);

            pacmanRef.value?.resetPosition(pacmanStartPosition);
            if(powerUp){
              resetPowerUp();
            }
            ghostRefs.value.forEach((ghostRef, idx) => {
            ghostRef?.resetPosition(ghosts.value[idx].startPosition);
            });
          }
        }
      }
    }
    return false; 
  }

  function eatGhost(ghostIdx: number){
    let scoreValue = 0;
    ghostsEatenTotal.value += 1;
    switch (ghostsEaten) {
      case 0:
        scoreValue = 200;
        score.value += 200;
        ghostsEaten++;
        console.log("Geist gegessen (0)");
        break;
      case 1:
        scoreValue = 400;
        score.value += 400;
        ghostsEaten++;
        console.log("Geist gegessen (1)");
        break;
      case 2:
        scoreValue = 800;
        score.value += 800;
        ghostsEaten++;
        console.log("Geist gegessen (2)");
        break;
      case 3:
        scoreValue = 1600;
        score.value += 1600;
        ghostsEaten = 0;
        console.log("Geist gegessen (3)");
        break;
      default: 
        console.log("Unexpexted state of ghostsEaten:");
        console.log(ghostsEaten);
    }
    scorePopUp(ghostIdx,scoreValue);
    switch (ghostIdx){
      case 0:
        ghosts.value[ghostIdx].image = Blinky;
        break;
      case 1:
        ghosts.value[ghostIdx].image = Pinky;
        break;
      case 2:
        ghosts.value[ghostIdx].image = Inky;
        break;
      case 3:
        ghosts.value[ghostIdx].image = Clyde;
        break;
      default:
        console.log("Unexpexted state of ghostIndex:");
        console.log(ghostIdx);         
    }
    console.log(ghostIdx);
    ghostRefs.value[ghostIdx]?.resetPosition(ghosts.value[ghostIdx].startPosition);
  }

  function scorePopUp(ghostIdx: number, scoreValue :number){
    floatingScores.value = [];
    const ghostPos = ghostRefs.value[ghostIdx]?.position;
    if (ghostPos) {
    floatingScores.value.push({
      x: ghostPos.x,
      y: ghostPos.y,
      value: scoreValue,
      id: floatingScoreId++
    });
    setTimeout(() => {
      floatingScores.value = floatingScores.value.filter(fs => fs.id !== floatingScoreId - 1);
    }, 1000);
  }
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
      pointsEatenTotal.value += 1;
    } else {
      score.value += 50;
      pointsEaten ++;
      startPowerUp();
    }
  }

  function startPowerUp(){
    console.log("PowerUp gegessen");
    clearTimeout(timeoutId); 
    powerUp = true;
    ghostsEaten = 0;
    ghostRefs.value.forEach(ref => ref?.setVulnerable(true));

    ghosts.value[0].image = VulnerableGhost;
    ghosts.value[1].image = VulnerableGhost;
    ghosts.value[2].image = VulnerableGhost;
    ghosts.value[3].image = VulnerableGhost;


    timeoutId = window.setTimeout(() => {
      resetPowerUp();
    }, 10000);
  }

  function resetPowerUp(){
    powerUp = false;
    ghostsEaten = 0;

    ghosts.value[0].image = Blinky;
    ghosts.value[1].image = Pinky;
    ghosts.value[2].image = Inky;
    ghosts.value[3].image = Clyde;

    console.log("PowerUp zu Ende");
    ghostRefs.value.forEach(ref => ref?.setVulnerable(false));
  }

  function checkPoints(){
    if(pointsEaten >= numberOfPoints){
      resetPoints(grid.value);
      resetPowerUp();
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
    level.value += 1;
    floatingScores.value = [];
    pacmanRef.value?.resetPosition(pacmanStartPosition);
    ghostRefs.value.forEach((ghostRef, idx) => {
      ghostRef?.resetPosition(ghosts.value[idx].startPosition);
    });
    areGhostsPaused.value = true;
      setTimeout(() => {
      areGhostsPaused.value = false;
    }, 1000);
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

  function restartGame(){
    resetPowerUp();
    resetPoints(grid.value);
    floatingScores.value = [];

    score.value = 0;
    lives.value = 3;
    level.value = 0;
    ghostsEatenTotal.value = 0;
    pointsEatenTotal.value = 0;
    invulnerable.value = false;
    isGameStarted.value = false;

    gameOver.value = false;
    requestAnimationFrame(gameLoop);
  }

  window.addEventListener('keydown', (e) => {
  if (!isGameStarted.value) {
    startGame();
  }

  });

</script>

<template>
  <div v-bind="$attrs">
  <GameOver 
    v-if="gameOver"
    :score="score"
    :highscore="highscore"
    :level="level"
    :ghosts-eaten-total="ghostsEatenTotal"
    :points-eaten-total="pointsEatenTotal"
    @restart="restartGame"
  />
  <div id="game-field" class="game-field">
    <div class="game-wrapper">
      <div class="score-display">
        <span>Points: {{ score }}</span>
        <div class="lives">
        <img
          v-for="n in [3,2,1]"
          :key="n"
          src = '@/assets/Herz.png'
          alt="Herz"
          class="heart"
          :class="{ lost: n > lives }"
        />
        </div>
      </div>
      <div class="pacman-container">
      <img class="pacman-maze" src="@/assets/PacManMaze.png">
      <PacmanObject ref="pacmanRef" class="pacman" :grid="grid" :start-position="pacmanStartPosition" @update-grid="updateGrid"></PacmanObject>
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
      <div
        v-for="score in floatingScores"
        :key="score.id"
        class="floating-score"
        :style="{
        left: score.x + 'px',
        top: score.y + 'px'
        }"
      >
      {{ score.value }}
      </div>
    </div>
  </div>  
</div>
</div>
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
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 3rem;         
    font-weight: bold;
    color: white;          
    margin-bottom: 20px;     
    letter-spacing: 2px;
    background-color: black;
  }

  .lives {
    display: flex;
    gap: 10px;
  }

  .heart {
    width: 40px;
    height: 40px;
    transition: opacity 0.3s;
  }

  .heart.lost {
    opacity: 0.2;
  }

  .floating-score {
    position: absolute;
    color: yellow;
    font-size: 24px;
    font-weight: bold;
    z-index: 100;
  }

</style>
