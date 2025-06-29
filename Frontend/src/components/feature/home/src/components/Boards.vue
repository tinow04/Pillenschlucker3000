<template>
  <div class="fixed-wrapper">
    <div class="board-container">
      <div class="board right">
        <h2 class="board-title">Leaderboard</h2>
        <div class="leader-box">
          <StatCard :id="1" name="Tino" :points="1234"  />
          <StatCard :id="2" name="Robin" :points="1234" />
          <StatCard :id="3" name="Herr Fischer" :points="1234" />
          <StatCard :id="4" name="Philipp" :points="2" />
          <StatCard :id="5" name="Jonah" :points="312" />
          <StatCard :id="6" name="Fischer" :points="54324" />
          <StatCard :id="7" name="Herr Robin Fischer" :points="643" />
          <StatCard :id="8" name="Herr Mann" :points="443" />
          <StatCard :id="9" name="Fischers Fritz" :points="645" />
          <StatCard :id="10" name="Fischermans Friend" :points="6" />
        </div>
      </div>


      <div class="board left">
        <h2 class="board-title">Statistics</h2>
        <div class="stats-container">
          <div class="stat-group">
            <p class="stat-title">Highscore</p>
            <p class="stat-value">59,200</p>
          </div>
          <div class="stat-group">
            <p class="stat-title">Last Score</p>
            <p class="stat-value">12,600</p>
          </div>
          <div class="stat-group">
            <p class="stat-title">Games Played</p>
            <p class="stat-value">31</p>
          </div>
          <div class="stat-group">
            <p class="stat-title">Total Play Time</p>
            <p class="stat-value">01h 21min</p>
          </div>
          <div class="stat-group">
            <p class="stat-title">Highest Level</p>
            <p class="stat-value">7</p>
          </div>
          <div class="stat-group">
            <p class="stat-title">Ghosts Eaten</p>
            <p class="stat-value">21</p>
          </div>
          <div class="stat-group">
            <p class="stat-title">Most Deadly Ghost</p>
            <p class="stat-value">Pinky</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatCard from "@/components/feature/home/src/components/stats/StatCard.vue";

export default {
  name: "BoardsComponent",
  components: {StatCard},
};
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
