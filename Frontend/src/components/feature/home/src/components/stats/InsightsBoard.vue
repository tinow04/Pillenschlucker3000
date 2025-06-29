<script setup lang="ts">

import StatCard from "@/components/feature/home/src/components/stats/StatCard.vue";
</script>

<template>

  <h2 class="board-title">Leaderboard</h2>
  <div class="leaderBox">
    <StatCard :id="1" name="Tino" :points="1234" />
    <StatCard :id="2" name="Robin" :points="1234" />
    <StatCard :id="3" name="Herr Fischer" :points="1234" />
  </div>
</template>

<style scoped>
.leaderBox {
  background-color: #183446;
  width: 29rem;
  height: 42rem;
  color: #BFBFBF;
  display: grid;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
}

.board-title {
  background-color: #183446;
  width: 24rem;
  margin-top: -41rem;
  color: #FFFF;
  text-align: center;
  position: fixed;
  padding: 0rem 0;
  font-size: 2.8rem;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
}
</style>
