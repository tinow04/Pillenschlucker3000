<template>
  <div id="scaler">
    <div class="home-page">
      <Header />

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

<script>
import { useUserStore } from '@/piniaStore';
import Header from "@/components/feature/home/src/components/Header.vue";
import Buttons from "@/components/feature/home/src/components/Buttons.vue";
import Profile from "@/components/feature/home/src/components/Profile.vue";
import ImageBottom from "@/components/feature/home/src/components/ImageBottom.vue";
import StartAnimation from "@/components/feature/home/src/components/StartAnimation.vue";
import HowTo from "@/components/feature/home/src/components/HowTo.vue";
import Settings from "@/components/feature/home/src/components/Settings.vue";
import Boards from "@/components/feature/home/src/components/Boards.vue";

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
      userStore: useUserStore(), // <-- Zugriff auf Pinia Store
    };
  },
  computed: {
    buttonList() {
      const isLoggedIn = !!this.userStore.userId;
      return [
        { label: "PLAY", handler: this.startGame },
        { label: "HOW TO", handler: this.openHowTo },
        { label: "SETTINGS", handler: this.openSettings },
        {
          label: "LOCKER",
          handler: () => {
            this.$router.push("/locker");
          },
          disabled: !isLoggedIn,
          tooltip: "Log in to unlock the locker",
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
      const scale = Math.min(scaleX, scaleY); // wichtig: NICHT max!

      const offsetX = (window.innerWidth - baseWidth * scale) / 2;
      const offsetY = (window.innerHeight - baseHeight * scale) / 2;

      const scaler = document.getElementById("scaler");
      if (scaler) {
        scaler.style.top = "0";
        scaler.style.left = "0";
        scaler.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
        scaler.style.transformOrigin = "top left";
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
}

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

.leaderboard-board {
  justify-content: left;
}
</style>
