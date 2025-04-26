<script setup lang="ts">
let points : number = 0;

function getPoints(): void {
    points += 10;
    //document.getElementById("points")!.innerText = points.toString();
}
</script>

<template>
   <div>
    <img class="points-img" src="@/assets/Gelber_Punkt.svg.png" alt="Point Image">
  </div>
</template>

<style scoped>
.points-img {
  width: 8px;
  height: 8px;
}
</style>
<!--
<template>
  <header class="title">
    <h1>PACMAN</h1>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>

<style scoped>
.title {
  color: yellow;
  font-size: 6rem;
  text-align: center;
  margin-top: -40rem;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
}
</style>-->