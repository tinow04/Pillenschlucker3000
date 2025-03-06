<template>
  <div class="home-page">
    <Header />
    <Buttons @start-game="startGame" /> <!-- Empfang des Events -->
    <Profile />
    <Boards />
    <ImageBottom />

    <!-- Zeigt die Animation an, wenn isGameStarted true ist -->
    <StartAnimation v-if="isGameStarted" />
  </div>
</template>

<script>
import Header from "@/components/feature/home/src/components/Header.vue";
import Buttons from "@/components/feature/home/src/components/Buttons.vue";
import Profile from "@/components/feature/home/src/components/Profile.vue";
import Boards from "@/components/feature/home/src/components/Boards.vue";
import ImageBottom from "@/components/feature/home/src/components/ImageBottom.vue";
import StartAnimation from "@/components/feature/home/src/components/StartAnimation.vue"; // Importiere StartAnimation

export default {
  components: {
    Header,
    Buttons,
    Profile,
    Boards,
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
  align-items: center;
  justify-content: center;
}
</style>
