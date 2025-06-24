<template>
  <div class="home-page">
    <Header />
    <Buttons @start-game="startGame" /> <!-- Empfang des Events -->
    <Profile />

    <ImageBottom />
    <LeaderboardBox />
    <!-- Zeigt die Animation an, wenn isGameStarted true ist -->
    <StartAnimation v-if="isGameStarted" />
  </div>
</template>

<script>
import Header from "@/components/feature/home/src/components/Header.vue";
import Buttons from "@/components/feature/home/src/components/Buttons.vue";
import Profile from "@/components/feature/home/src/components/Profile.vue";
import LeaderboardBox from "@/components/feature/home/src/components/stats/LeaderboardBox.vue";
import ImageBottom from "@/components/feature/home/src/components/ImageBottom.vue";
import StartAnimation from "@/components/feature/home/src/components/StartAnimation.vue"; // Importiere StartAnimation

export default {
  components: {
    Header,
    Buttons,
    Profile,
    LeaderboardBox,
    ImageBottom,
    StartAnimation,  // Hier die StartAnimation einfügen
  },
  data() {
    return {
      isGameStarted: false, // Steuert, ob die StartAnimation angezeigt wird
    };
  },
  methods: {
    startGame() {
      this.isGameStarted = true; // Setzt isGameStarted auf true, wenn der Play-Button gedrückt wird
    }
  }
};
</script>

<style scoped>
.home-page {
  background-color: #162034;
  font-family: "Jersey 10", serif;
  overflow: hidden;
  user-select: none;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.board-container {
  display: flex;
  justify-content: center;
  gap: 55rem;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8rem;

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

</style>
