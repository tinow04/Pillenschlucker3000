<template>
  <div class="popup">
    <div class="popup-inner">
      <button class="close" @click="$emit('close')">×</button>
      <img src="" alt="How to play" class="howto-img" />
    </div>
  </div>
</template>

<script>
export default {
  name: "HowToPopup"
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.popup-inner {
  background: #222;
  padding: 1rem;
  border-radius: 1rem;
  max-width: 90%;
  max-height: 90%;
  position: relative;
}
.close {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}
.howto-img {
  max-width: 100%;
  max-height: 80vh;
  display: block;
  margin: 0 auto;
}
</style>
