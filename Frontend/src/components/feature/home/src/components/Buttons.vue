<template>
  <div class="button-container">
    <button
      v-for="btn in buttons"
      :key="btn.label"
      class="button"
      @click="btn.handler"
    >
      {{ btn.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: "ButtonsComponent",
  methods: {
    startGame() {
      this.$emit("start-game");
    },
    showHowTo() {
      this.$emit("howto-click");
    },
    showSettings() {
      this.$emit("settings-click");
    }
  },
  computed: {
    buttons() {
      return [
        { label: "PLAY",     handler: this.startGame },
        { label: "HOW TO",   handler: this.showHowTo },
        { label: "SETTINGS", handler: this.showSettings }
      ];
    }
  }
};
</script>

<style scoped>
.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  min-height: 100vh;
  margin-top: 40rem;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.button {
  width: 17rem;
  height: 5rem;
  background-color: black;
  color: white;
  font-family: "Jersey 10", serif;
  border: none;
  border-radius: 1rem;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
  font-size: 3rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  transform-origin: center;
}
.button:hover {
  transform: scale(1.02);
  font-size: 3.2rem;
  background-color: #222;
}
</style>
