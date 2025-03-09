<script setup lang="ts">

let points: number = 0;

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