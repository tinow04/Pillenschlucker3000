<template>
  <div class="scaler">
    <slot />
  </div>
</template>

<script>
export default {
  name: "ScalingWrapper",
  mounted() {
    this.updateScale();
    window.addEventListener("resize", this.updateScale);
  },
  unmounted() {
    window.removeEventListener("resize", this.updateScale);
  },
  methods: {
    updateScale() {
      const designWidth = 1920;
      const scale = window.innerWidth / designWidth;
      document.documentElement.style.setProperty("--scale-factor", scale);
    },
  },
};
</script>

<style scoped>
.scaler {
  width: 100vw;
  height: 100vh;
  transform: scale(var(--scale-factor));
  transform-origin: top left;
  overflow: hidden;
}
</style>
