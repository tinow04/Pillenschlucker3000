<template>
  <div class="fixed-wrapper">


    <div class="board-container">

      <div class="board right">
        <h2 class="board-title">Leaderboard</h2>
        <ol class="leaderboard-list">
          <li><span>1</span> <span>PlayerX</span> <span>98,750</span></li>
          <li><span>2</span> <span>GhostHunter</span> <span>92,420</span></li>
          <li><span>3</span> <span>PacMaster99</span> <span>87,310</span></li>
          <li><span>4</span> <span>ChompKing</span> <span>79,850</span></li>
          <li><span>5</span> <span>SpeedyGonzales</span> <span>75,600</span></li>
          <li><span>6</span> <span>PowerPelletPro</span> <span>72,300</span></li>
          <li><span>7</span> <span>DotEater</span> <span>68,940</span></li>
          <li><span>8</span> <span>MazeRunner</span> <span>63,550</span></li>
          <li><span>9</span> <span>PixelChaser</span> <span>59,200</span></li>
          <li><span>10</span> <span>RetroGamer</span> <span>55,890</span></li>
        </ol>
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
export default {
  name: "BoardsComponent",
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
</style>
