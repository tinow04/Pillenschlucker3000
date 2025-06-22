<template>
  <div id="scaler">
    <div class="home-page">
      <Header />

      <!-- hier übergeben wir jetzt die Button-Liste -->
      <Buttons :buttons="buttonList" />

      <Profile />
      <Boards />
      <ImageBottom />
      <StartAnimation v-if="isGameStarted" />

      <!-- How To Popup -->
      <HowTo v-if="showHowTo" @close="showHowTo = false" />

      <!-- Settings Popup -->
      <Settings v-if="showSettings" @close="showSettings = false" />
    </div>
  </div>
</template>

<script lang="ts">
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
    Settings,
  },
  data() {
    return {
      isGameStarted: false,
      showHowTo: false,
      showSettings: false,
    };
  },
  computed: {
    buttonList() {
      return [
        { label: "PLAY", handler: this.startGame },
        { label: "HOW TO", handler: this.openHowTo },
        { label: "SETTINGS", handler: this.openSettings },
        {
          label: "LOCKER",
          handler: () => {
            // Hier könnte später Locker-Funktionalität eingefügt werden
          },
        },
      ];
    },
  },
  methods: {
    startGame() {
      this.isGameStarted = true;
    },
    openHowTo() {
      this.showHowTo = true;
    },
    openSettings() {
      this.showSettings = true;
    },
    updateScale() {
      const baseWidth = 1920;
      const baseHeight = 1080;
      const scaleX = window.innerWidth / baseWidth;
      const scaleY = window.innerHeight / baseHeight;
      const scale = Math.max(scaleX, scaleY);
      const scaler = document.getElementById("scaler");
      if (scaler) {
        scaler.style.top = "0";
        scaler.style.left = "0";
        scaler.style.transform = `scale(${scale})`;
      }
      document.documentElement.style.setProperty("--scale-factor", scale);
    },
  },
  mounted() {
    this.updateScale();
    window.addEventListener("resize", this.updateScale);
  },
  unmounted() {
    window.removeEventListener("resize", this.updateScale);
  },
};
</script>

<style scoped>
#scaler {
  width: 1920px;
  height: 1080px;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: top left;
  overflow: hidden;
}

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
