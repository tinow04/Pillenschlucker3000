<template>
  <div class="fixed-wrapper">
    <div class="board-container">
      <div class="board">
        <h2 class="board-title">Leaderboard</h2>
        <div class="leader-box">
          <StatCard :id="1" name="Tino" />
          <StatCard :id="2" name="Robin" />
          <StatCard :id="3" name="Herr Fischer" />
          <StatCard :id="4" name="Philipp" />
          <StatCard :id="5" name="Jonah" />
          <StatCard :id="6" name="Fischer" />
          <StatCard :id="7" name="Herr Robin Fischer" />
          <StatCard :id="8" name="Herr Mann" />
          <StatCard :id="9" name="Fischers Fritz" />
          <StatCard :id="10" name="Fischermans Friend" />
        </div>
      </div>
      <div class="board">
        <h2 class="board-title">Statistics</h2>
        <div v-if="playerID == null">
          <a > Log in to see data </a>
        </div>
        <div class="stats-container" v-else>
          <LeaderboardCard tag="Highscore" stat="12324"/>
          <LeaderboardCard tag="Last Score" stat="12321"/>
          <LeaderboardCard tag="Games Played" stat="54"/>
          <LeaderboardCard tag="Total Play Time" stat="02h 21min"/>
          <LeaderboardCard tag="Highest Level" stat="12"/>
          <LeaderboardCard tag="Total Ghosts Eaten" stat="34"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StatCard from "@/components/feature/home/src/components/stats/StatCard.vue";
import LeaderboardCard from "@/components/feature/home/src/components/stats/LeaderboardCard.vue";
import {useUserStore} from "@/piniaStore.js";

const userStore = useUserStore();
const playerID = userStore.userId;
console.log("playerID = ", playerID);

</script>

<style scoped>


.fixed-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
  position: relative;
}

.board-container {
  display: flex;
  justify-content: center;
  gap: 55rem;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}


.board {
  background-color: #183446;
  width: 29rem;
  height: 42rem;
  color: #BFBFBF;
  display: flex;
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

.leaderboard-list {
  list-style: none;
  padding: 0;
  margin-top: 3rem;
}

.leaderboard-list li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 2rem;
  gap: 3rem;
}

.stats-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 1rem;
}

.stat-group {
  margin-bottom: -1.2rem;
}

.stat-title {
  margin-bottom: -0.2rem;
  font-size: 2.5rem;
}

.stat-value {
  margin: 0;
  font-size: 1.6rem;
}

.leader-box {
  margin-left: 0.5rem;
  display: grid;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 2rem;
  gap: 0.5rem;
}
</style>
