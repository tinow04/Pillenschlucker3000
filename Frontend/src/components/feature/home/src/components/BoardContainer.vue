<script setup lang="ts">
const leaderboard = [
  { rank: 1, name: "PlayerX", score: "98,750" },
  { rank: 2, name: "GhostHunter", score: "92,420" },
  { rank: 3, name: "PacMaster99", score: "87,310" },
  { rank: 4, name: "ChompKing", score: "79,850" },
  { rank: 5, name: "SpeedyGonzales", score: "75,600" },
];

const stats = [
  { title: "Highscore", value: "59,200" },
  { title: "Last Score", value: "12,600" },
  { title: "Games Played", value: "31" },
  { title: "Total Play Time", value: "01h 21min" },
  { title: "Highest Level", value: "7" },
  { title: "Ghosts Eaten", value: "21" },
  { title: "Most Deadly Ghost", value: "Pinky" },
];
</script>

<template>
  <div class="board-container">
    <div class="board right">
      <h2 class="board-title">Leaderboard</h2>
      <ol class="leaderboard-list">
        <li v-for="entry in leaderboard" :key="entry.rank">
          <span>{{ entry.rank }}</span>
          <span>{{ entry.name }}</span>
          <span>{{ entry.score }}</span>
        </li>
      </ol>
    </div>

    <div class="board left">
      <h2 class="board-title">Statistics</h2>
      <div class="stats-container">
        <div class="stat-group" v-for="stat in stats" :key="stat.title">
          <p class="stat-title">{{ stat.title }}</p>
          <p class="stat-value">{{ stat.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.board-container {
  display: flex;
  justify-content: center;
  gap: 55rem;
}

.board {
  background-color: #183446;
  width: 29rem;
  height: 42rem;
  margin-top: -64rem;
  color: #BFBFBF;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
}

.board-title {
  color: white;
  font-size: 2.8rem;
  text-align: center;
  position: fixed;
}

.leaderboard-list {
  list-style: none;
  padding: 0;
  margin-top: 3rem;
}

.leaderboard-list li {
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
}
</style>
