<script setup lang="ts">
let powerup: boolean = false;
let eaten: number = 0;
let points: number = 0;
let timeoutId: number | undefined;

function reset(): void {
    powerup = false;
    eaten = 0;
    points = 0;
    /*document.getElementById("eaten")!.innerText = eaten.toString();
    document.getElementById("powerup")!.innerText = powerup.toString();
    document.getElementById("points")!.innerText = points.toString();*/
    clearTimeout(timeoutId);
}

function powerupStart(): void {
    clearTimeout(timeoutId);
    powerup = true;
    points += 50;
    eaten = 0;
    /*document.getElementById("eaten")!.innerText = eaten.toString();
    document.getElementById("powerup")!.innerText = "true";*/
    timeoutId = window.setTimeout(() => {
       powerup = false;
       /*document.getElementById("powerup")!.innerText = "false";
       document.getElementById("eaten")!.innerText = "0";*/
    }, 10000);
}

function ghostEaten(): void {
    eatGhost();
    //document.getElementById("points")!.innerText = points.toString();
    eaten++;
    //document.getElementById("eaten")!.innerText = eaten.toString();
}
function eatGhost(): void {
    if (eaten === 0) {
        points += 200;
    }
    if (eaten === 1) {
        points += 400;
    }
    if (eaten === 2) {
        points += 800;
    }
    if (eaten === 3) {
        points += 1600;
    }
}
</script>

<template>
   <div>
    <img class="powerup-img" src="@/assets/Roter-punkt.svg.png" alt="PowerUp Image">
  </div>
</template>

<style scoped>
.powerup-img {
  width: 15px;
  height:  15px;
  margin: auto; 
}
</style>