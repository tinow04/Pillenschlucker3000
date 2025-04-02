<template>
  <div class="home-page">
    <Header />
    <Buttons
      @start-game="startGame"
      @howto-click="showHowTo = true"
      @settings-click="showSettings = true"
    />
    <Profile />
    <Boards />
    <ImageBottom />
    <StartAnimation v-if="isGameStarted" />

    <!-- How To Popup -->
    <HowTo v-if="showHowTo" @close="showHowTo = false" />

    <!-- Settings Popup -->
    <Settings v-if="showSettings" @close="showSettings = false" />
  </div>
</template>

<script>
import Header from "@/components/feature/home/src/components/Header.vue";
import Buttons from "@/components/feature/home/src/components/Buttons.vue";
import Profile from "@/components/feature/home/src/components/Profile.vue";
import Boards from "@/components/feature/home/src/components/Boards.vue";
import ImageBottom from "@/components/feature/home/src/components/ImageBottom.vue";
import StartAnimation from "@/components/feature/home/src/components/StartAnimation.vue";
import HowTo from "@/components/feature/home/src/components/HowTo.vue";
import Settings from "@/components/feature/home/src/components/Settings.vue";

export default {
  components: {
    Header,
    Buttons,
    Profile,
    Boards,
    ImageBottom,
    StartAnimation,
    HowTo,
    Settings
  },
  data() {
    return {
      isGameStarted: false,
      showHowTo: false,
      showSettings: false
    };
  },
  methods: {
    startGame() {
      this.isGameStarted = true;
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
