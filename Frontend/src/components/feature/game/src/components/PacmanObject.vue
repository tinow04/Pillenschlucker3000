<script setup lang="ts">

  import { onMounted, onUnmounted, ref} from "vue";
  const props = defineProps<{ grid: number[][] }>();
  const speed = 1.67;
  const position = ref({ x: 20, y: 20 });
  const mazeWidth = 700;
  const mazeHeight = 755;
  const pacmanSize = 35;
  const hitboxOffsetUp = -8;
  const hitboxOffsetLeft = -8;

  const canMoveTo = (x: number, y: number) => {
    const col = Math.floor((x - hitboxOffsetLeft) / 25);
    const row = Math.floor((y - hitboxOffsetUp) / 25);
    return props.grid[row] && props.grid[row][col] >= 3;
  };

  function moveOverPoint(x: number, y: number):void {
    const col = Math.floor((x - hitboxOffsetLeft) / 25);
    const row = Math.floor((y - hitboxOffsetUp) / 25);
    if(props.grid[row] && props.grid[row][col] === 3){
      props.grid[row][col]=4;
      console.log("Über Punkt gelaufen");  
    }
    if(props.grid[row] && props.grid[row][col] === 5){
      props.grid[row][col]=6;
      console.log("Über PowerUp gelaufen");  
    }
  };

  function gameLoop(x: number, y: number):void {
    moveOverPoint(x,y);
  }

  const imageURLPacman = ref<string>('https://i.gifer.com/XOsf.gif');
  const imagePacman = ref<HTMLImageElement | null>(null);
  let alreadyRotatedW = false;
  let alreadyRotatedD = false;
  let alreadyRotatedS = false;
  let alreadyRotatedA = false;

  let durationMoveW: number | null =null;
  let durationMoveD: number | null =null;
  let durationMoveS: number | null =null;
  let durationMoveA: number | null =null;

  onMounted(() =>{
    window.addEventListener("keyup", Direction);
  });

  onUnmounted (()=> {
    window.removeEventListener("keyup", Direction)
  });

  const Direction = (event: KeyboardEvent) =>{

    if((event.key == "W" || event.key =="w" || event.key == "ArrowUp") && alreadyRotatedW == false && position.value.y > 0 && canMoveTo(position.value.x, position.value.y - speed)){
      if(durationMoveA != null){
        clearInterval(durationMoveA);
      }
      if(durationMoveD != null){
        clearInterval(durationMoveD);
      }
      if(durationMoveS != null){
        clearInterval(durationMoveS);
      }

        durationMoveW = setInterval(() =>{
          if(imagePacman.value == null){
            if(durationMoveW != null){
              clearInterval(durationMoveW);
              }
            }else {
              if (position.value.y > 0 && canMoveTo(position.value.x, position.value.y - speed)) {
                if(imagePacman.value && alreadyRotatedW == false) {
                  position.value.y -= speed;
                  imagePacman.value.style.transform = `rotate(270deg)`;
                  alreadyRotatedW = true;
                  alreadyRotatedD = false;
                  alreadyRotatedS = false;
                  alreadyRotatedA = false;
                }
                position.value.y -= speed;
                imagePacman.value!.style.top = `${position.value.y}px`;
              }
            };
          },10);
      }

      if((event.key == "D" || event.key =="d" || event.key == "ArrowRight") && alreadyRotatedD == false && position.value.x < mazeWidth - pacmanSize && canMoveTo(position.value.x + speed + pacmanSize -18, position.value.y)){
        if(durationMoveA != null){
          clearInterval(durationMoveA);
        }
        if(durationMoveS != null){
          clearInterval(durationMoveS);
        }
        if(durationMoveW != null){
          clearInterval(durationMoveW);
        }

          durationMoveD = setInterval(()=>{
            if(imagePacman.value == null){
              if(durationMoveD != null)
              clearInterval(durationMoveD);
            }else {
                if (position.value.x < mazeWidth - pacmanSize && canMoveTo(position.value.x + speed + pacmanSize - 18, position.value.y)) {
                  if(imagePacman.value && alreadyRotatedD == false) {
                    position.value.x += speed;
                    imagePacman.value.style.transform = `rotate(360deg)`;
                    alreadyRotatedW = false;
                    alreadyRotatedD = true;
                    alreadyRotatedS = false;
                    alreadyRotatedA = false;
                  }
                  position.value.x += speed;
                  imagePacman.value!.style.left = `${position.value.x}px`;
                }
              }
          },10);
      }

      if((event.key == "S" || event.key =="s" || event.key == "ArrowDown") && alreadyRotatedS == false && position.value.y < mazeHeight - pacmanSize && canMoveTo(position.value.x, position.value.y + speed + pacmanSize -15)){
        if(durationMoveD != null){
          clearInterval(durationMoveD);
        }
        if(durationMoveA != null){
          clearInterval(durationMoveA);
        }
        if(durationMoveW != null){
          clearInterval(durationMoveW);
        }


          durationMoveS = setInterval(()=>{
            if(imagePacman.value == null){
              if(durationMoveS != null){
                clearInterval(durationMoveS);
              }
            }else {
              if (position.value.y < mazeHeight - pacmanSize && canMoveTo(position.value.x, position.value.y + speed + pacmanSize - 15)) {
                if(imagePacman.value && alreadyRotatedS == false) {
                  position.value.y += speed;
                  imagePacman.value.style.transform = `rotate(90deg)`;
                  alreadyRotatedW = false;
                  alreadyRotatedD = false;
                  alreadyRotatedS = true;
                  alreadyRotatedA = false;
                }
                position.value.y += speed;
                imagePacman.value!.style.top = `${position.value.y}px`;
              }
            }
          },10);
      }

      if((event.key == "A" || event.key =="a" || event.key == "ArrowLeft") && alreadyRotatedA == false && position.value.x > 0 && canMoveTo(position.value.x - speed, position.value.y)){
        if(durationMoveS != null){
          clearInterval(durationMoveS);
        }
        if(durationMoveD != null){
          clearInterval(durationMoveD);
        }
        if(durationMoveW != null){
          clearInterval(durationMoveW);
        }

          durationMoveA = setInterval(()=>{
            if(imagePacman.value == null){
              if(durationMoveA != null){
                clearInterval(durationMoveA);
              }
            }else {
              if (position.value.x > 0 && canMoveTo(position.value.x - speed, position.value.y)) {
                if(imagePacman.value && alreadyRotatedA == false) {
                  position.value.x -= speed;
                  imagePacman.value.style.transform = `rotate(180deg)`;
                  alreadyRotatedW = false;
                  alreadyRotatedD = false;
                  alreadyRotatedS = false;
                  alreadyRotatedA = true;
                }
                position.value.x -= speed;
                imagePacman.value!.style.left = `${position.value.x}px`;
              }
            }
          },10);
        }
    };
</script>

<template>
  <div class="pacman-container" ref="imagePacman" :style="{ left: position.x + 'px', top: position.y + 'px' }">
    <img  :src="imageURLPacman" id="pacmanGIf" alt="Pacman Gif">
  </div>
</template>

<style scoped>
  .pacman-container {
    position: absolute;
    width: 35px;
    height: 35px;
  }

  #pacmanGIf {
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
