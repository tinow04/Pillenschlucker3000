<template>
  <div class="howto-overlay" @click.self="close">
    <div class="howto-popup">
      <button class="close-btn" @click="close">×</button>
      <img src="@/assets/howto.png" alt="How To Anleitung" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HowToPopup',
  emits: ['close'],
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.howto-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.howto-popup {
  background: #fff;
  border-radius: 0.75rem;
  max-width: 80vw;
  max-height: 80vh;
  overflow: auto;
  position: relative;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
}

.howto-popup img {
  display: block;
  width: 100%;
  height: auto;
}

.close-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.75rem;
  cursor: pointer;
  line-height: 1;
}
</style>
