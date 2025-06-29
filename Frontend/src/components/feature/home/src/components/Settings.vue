<template>


  <div class="popup">
    <div class="popup-inner">
      <button class="close" @click="$emit('close')">×</button>
      <h2>Einstellungen</h2>
      <label for="volume">Lautstärke:</label>
      <input
        id="volume"
        type="range"
        min="0"
        max="100"
        v-model="volume"
        @input="updateVolume"
      />
      <p>{{ volume }}%</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "SettingsPopup",
  setup() {
    const volume = ref(50);

    const updateVolume = () => {
      localStorage.setItem("globalVolume", volume.value);
    };

    return { volume, updateVolume };
  }
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.popup-inner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #222;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 90vw;
  max-height: 90vh;
  color: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
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
input[type="range"] {
  width: 100%;
  margin-top: 1rem;
}

</style>
