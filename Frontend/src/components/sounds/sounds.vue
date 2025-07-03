<template></template>


<script lang="ts">
import { ref, onMounted } from 'vue';

// Lautstärke aus LocalStorage
const volume = ref(
  +(localStorage.getItem('globalVolume') ?? 50) / 100
);

const sounds = {
  eatGhost: new Audio(new URL('@/assets/Sounds/pacman_eatghost.wav', import.meta.url).href),
  death: new Audio(new URL('@/assets/Sounds/pacman_death.wav', import.meta.url).href),
  chomp: new Audio(new URL('@/assets/Sounds/pacman_chomp.wav', import.meta.url).href),
  intro: new Audio(new URL('@/assets/Sounds/pacman_beginning.wav', import.meta.url).href),
  intermission: new Audio(new URL('@/assets/Sounds/pacman_intermission.wav', import.meta.url).href),
};

onMounted(() => {
  for (const sound of Object.values(sounds)) {
    sound.volume = volume.value;
  }
});

function playSound(name: keyof typeof sounds) {
  const base = sounds[name];
  if (!base) return;

  const instance = base.cloneNode() as HTMLAudioElement;
  instance.volume = volume.value;
  instance.play().catch(() => {});
}

export { playSound, volume };

export default {
  name: 'SoundHandler'
};

</script>
