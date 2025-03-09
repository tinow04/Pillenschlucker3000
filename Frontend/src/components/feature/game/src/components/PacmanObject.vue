<script setup lang="ts">

  import type { RefSymbol } from '@vue/reactivity';
  import { ref } from 'vue';
  import { onMounted, onUnmounted} from "vue"; //Hier importiere ich die Vue-Funktionen onMounted und onUnmounted. Durch onMounted wird hier der EventListener einmal im Document Object Model montiert. Wenn man jetzt dann aber zum Beispiel einmal den Screen wechselt wo die Komponente nicht mehr sichtbar ist, dann wird der EventListener durch onUnmounted entfernt. Dadurch wird dann verhindert das Speicherleks enstehen können.

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

  const imageURLDot = ref<string>('https://upload.wikimedia.org/wikipedia/commons/a/aa/Gelber_Punkt.svg');
  const imageDot = ref<HTMLImageElement | null>(null);

  const colisionDot = () => {
    if(imagePacman.value == null){
      return;
    } else {
     punkte.value.forEach((punkt, index) =>{
      const distanceBetweenDotAndPacmanTop = Math.abs(punkt.positionX - imagePacman.value!.offsetTop);
      const distanceBetweenDotAndPacmanLeft = Math.abs(punkt.positionX - imagePacman.value!.offsetLeft);

      if(distanceBetweenDotAndPacmanLeft <= 10 && distanceBetweenDotAndPacmanTop <= 10) {
        punkte.value[index].visible = false;
      }
     });
    }
  }


  onMounted(() =>{
    window.addEventListener("keyup", Direction);
  });

  onUnmounted (()=> {
    window.removeEventListener("keyup", Direction)
  });

  const Direction = (event: KeyboardEvent) =>{

    if(event.key == "W" || event.key =="w" || event.key == "ArrowUp"){
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

      if(event.key == "D" || event.key =="d" || event.key == "ArrowRight"){
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

      if(event.key == "S" || event.key =="s" || event.key == "ArrowDown"){
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

      if(event.key == "A" || event.key =="a" || event.key == "ArrowLeft"){
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
    <img ref="imagePacman" :src="imageURLPacman" id="pacmanGIf" alt="Pacman Gif">
    <div v-for="punkt in punkte.filter(p => p.visible)"   :key="punkt.id" :style="{ top: punkt.positionY + 'px', left: punkt.positionX + 'px'}" class="punkt">
      <img ref="imageDot" :src="imageURLDot" id="pacmanDot" alt="Dot">
    </div>
</template>

<style scoped>
  #pacmanGIf {
    position:absolute;
    top: 0px;
    left: 0px;
    image-rendering: optimizeSpeed;         /*Austellen von "anti-alias sinc". Aliassign wird verwendet wenn ein Bild hoch squaliert wird d.h. es ensteht ein Treppeneffekt zur Kantenklätung. Dieser wird durch das Anti-Alias-Sinc ausgestellt damit nicht neachbarte Pixel kombiniert werden um eine neue Farbe zur Klätung zu erzeugen */
    image-rendering: -moz-crisp-edges;
    image-rendering: -o-crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: pixelated;
    -ms-interpolation-mode: nearest-neighbor;
  }

  #pacmanDot {
    position: absolute;
    height: 12.5px;
    width: 12.5px;
  }

  .punkt {
    position: absolute;
  }
</style>
