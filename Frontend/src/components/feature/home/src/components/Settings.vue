<template>
  <div class="settings-overlay" @click.self="close">
    <div class="settings-popup">
      <button class="close-btn" @click="close">×</button>

      <div class="settings-container">
        <h2>Einstellungen</h2>

        <!-- Mute Button -->
        <button @click="toggleMute" class="mute-button">
          <img
            :src="isSoundMuted ? muteImg : unmuteImg"
            :alt="isSoundMuted ? 'Ton aus' : 'Ton an'"
            class="mute-img"
          />
        </button>

        <!-- Volume Slider -->
        <label for="volume">Soundeffekte:</label>
        <input
          id="volume"
          type="range"
          min="0"
          max="100"
          v-model="volumeUI"
        />
        <p>{{ volumeUI }}%</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSoundStore } from '@/piniaStore';
import mute from '@/assets/Mute.png';
import unmute from '@/assets/Unmute.png';

const emit = defineEmits(['close']);
const soundStore = useSoundStore();

const volumeUI = computed({
  get: () => Math.round(soundStore.volume * 100),
  set: (val) => (soundStore.volume = val / 100),
});

const isSoundMuted = computed(() => soundStore.isMuted);

function toggleMute() {
  soundStore.toggleMute();
}

function close() {
  emit('close');
}

const muteImg = mute;
const unmuteImg = unmute;
</script>


<style scoped>
.settings-overlay {
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
  z-index: 9999;
}

.settings-popup {
  position: relative;
  background: #222;
  padding: 2rem;
  border-radius: 1rem;
  color: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  width: 320px;
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
  color: white;
  z-index: 1;
}

.settings-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  margin-top: 1rem;
  font-weight: bold;
}

input[type="range"] {
  width: 100%;
  margin-top: 0.5rem;
}

/* Mute Button Style */
.mute-button {
  margin-bottom: 1rem;
  width: 48px;
  height: 48px;
  padding: 0;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.mute-img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}
</style>
