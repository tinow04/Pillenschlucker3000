<template>
  <div class="popup" @click.self="$emit('close')">
    <div class="popup-inner">
      <button class="close" @click="$emit('close')">×</button>
      <h2>Einstellungen</h2>

      <label for="volume">Soundeffekte:</label>
      <input
        id="volume"
        type="range"
        min="0"
        max="100"
        v-model="volumeUI"
        @input="setVolume"
      />
      <p>{{ volumeUI }}%</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { volume } from '@/components/sounds/sounds.vue';

const volumeUI = ref(Math.round(volume.value * 100));

function setVolume() {
  volume.value = volumeUI.value / 100;
  localStorage.setItem("globalVolume", volumeUI.value.toString());
}
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
  position: relative;
  background: #222;
  padding: 2rem;
  border-radius: 1rem;
  color: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  width: 300px;
  text-align: center;
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
