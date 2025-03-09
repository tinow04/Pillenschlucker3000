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

  const imageURLPacman = ref<string>('https://i.gifer.com/XOsf.gif');
  const imagePacman = ref<HTMLImageElement | null>(null);
  let alreadyRotatedW = false;
  let alreadyRotatedD = false;
  let alreadyRotatedS = false;
  let alreadyRotatedA = false;
  let moveW = 0;
  let moveD = 0;
  let moveS = 0;
  let moveA = 0;
  let durationMoveW: number | null =null;
  let durationMoveD: number | null =null;
  let durationMoveS: number | null =null;
  let durationMoveA: number | null =null;

  const punkte = ref([
    { id: 1,visible: true, positionY: 100, positionX: 100},
    { id: 2,visible: true, positionY: 100, positionX: 130},
    { id: 3,visible: true, positionY: 100, positionX: 160},
    { id: 4,visible: true, positionY: 100, positionX: 190},
    { id: 5,visible: true, positionY: 100, positionX: 220},
    { id: 6,visible: true, positionY: 100, positionX: 250},
    { id: 7,visible: true, positionY: 100, positionX: 280},
    { id: 8,visible: true, positionY: 100, positionX: 310},
    { id: 9,visible: true, positionY: 100, positionX: 340},
    { id: 10,visible: true, positionY: 100, positionX: 370},

  ]);

  onMounted(() =>{
    window.addEventListener("keyup", Direction);
  });

  onUnmounted (()=> {
    window.removeEventListener("keyup", Direction)
  });

  const Direction = (event: KeyboardEvent) =>{

    if(event.key == "W" || event.key =="w" || event.key == "ArrowUp" && position.value.y > 0 && canMoveTo(position.value.x, position.value.y - speed)){
      if(durationMoveA != null){
        clearInterval(durationMoveA);
      }
      if(durationMoveD != null){
        clearInterval(durationMoveD);
      }
      if(durationMoveS != null){
        clearInterval(durationMoveS);
      }

      if(imagePacman.value && alreadyRotatedW == false) {
        imagePacman.value.style.transform = `rotate(270deg)`;
        alreadyRotatedW = true;
        alreadyRotatedD = false;
        alreadyRotatedS = false;
        alreadyRotatedA = false;
        moveW=parseInt(imagePacman.value.style.top, 10) || 0;
        durationMoveW = setInterval(() =>{
          if(imagePacman.value == null){
            if(durationMoveW != null){
              clearInterval(durationMoveW);
              }
            }else {
              moveW -=1;
              imagePacman.value.style.top = `${moveW}px`;
              colisionDot();
            };
          },10);
        }
      }

      if(event.key == "D" || event.key =="d" || event.key == "ArrowRight" && position.value.x < mazeWidth - pacmanSize && canMoveTo(position.value.x + speed + pacmanSize -18, position.value.y)){
        if(durationMoveA != null){
          clearInterval(durationMoveA);
        }
        if(durationMoveS != null){
          clearInterval(durationMoveS);
        }
        if(durationMoveW != null){
          clearInterval(durationMoveW);
        }

        if(imagePacman.value && alreadyRotatedD == false) {
          imagePacman.value.style.transform = `rotate(360deg)`;
          alreadyRotatedW = false;
          alreadyRotatedD = true;
          alreadyRotatedS = false;
          alreadyRotatedA = false;
          moveD=parseInt(imagePacman.value.style.left, 10) || 0;
          durationMoveD = setInterval(()=>{
            if(imagePacman.value == null){
              if(durationMoveD != null)
              clearInterval(durationMoveD);
            }else {
              moveD +=1;
              imagePacman.value.style.left = `${moveD}px`; //Ich setzte ich den Left Wert des Images durch dynamsiches Setzten durch die Tempalte String Schreibweise.
              colisionDot();
            }
          },10);
        };
      }

      if(event.key == "S" || event.key =="s" || event.key == "ArrowDown" && position.value.y < mazeHeight - pacmanSize && canMoveTo(position.value.x, position.value.y + speed + pacmanSize -15)){
        if(durationMoveD != null){
          clearInterval(durationMoveD);
        }
        if(durationMoveA != null){
          clearInterval(durationMoveA);
        }
        if(durationMoveW != null){
          clearInterval(durationMoveW);
        }


        if(imagePacman.value && alreadyRotatedS == false) {
          imagePacman.value.style.transform = `rotate(90deg)`;
          alreadyRotatedW = false;
          alreadyRotatedD = false;
          alreadyRotatedS = true;
          alreadyRotatedA = false;
          moveS=parseInt(imagePacman.value.style.top, 10) || 0;
          durationMoveS = setInterval(()=>{
            if(imagePacman.value == null){
              if(durationMoveS != null){
                clearInterval(durationMoveS);
              }
            }else {
              moveS +=1;
              imagePacman.value.style.top = `${moveS}px`;
              colisionDot();
            }
          },10);
        }
      }

      if(event.key == "A" || event.key =="a" || event.key == "ArrowLeft" && position.value.x > 0 && canMoveTo(position.value.x - speed, position.value.y)){
        if(durationMoveS != null){
          clearInterval(durationMoveS);
        }
        if(durationMoveD != null){
          clearInterval(durationMoveD);
        }
        if(durationMoveW != null){
          clearInterval(durationMoveW);
        }

        if(imagePacman.value && alreadyRotatedA == false) {
          imagePacman.value.style.transform = `rotate(180deg)`;
          alreadyRotatedW = false;
          alreadyRotatedD = false;
          alreadyRotatedS = false;
          alreadyRotatedA = true;
          moveA=parseInt(imagePacman.value.style.left, 10) || 0;
          durationMoveA = setInterval(()=>{
            if(imagePacman.value == null){
              if(durationMoveA != null){
                clearInterval(durationMoveA);
              }
            }else {
              moveA -=1;
              imagePacman.value.style.left = `${moveA}px`;
              colisionDot();
            }
          },10);
        }
      }
    };
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
