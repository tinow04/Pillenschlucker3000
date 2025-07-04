<script lang="ts">
import { ref, onMounted } from 'vue';

const volume = ref(
  +(localStorage.getItem('globalVolume') ?? 50) / 100
);

const sounds = {
  eatGhost: new Audio(new URL('@/assets/Sounds/pacman_eatghost.wav', import.meta.url).href),
  death: new Audio(new URL('@/assets/Sounds/pacman_death.wav', import.meta.url).href),
  intro: new Audio(new URL('@/assets/Sounds/pacman_beginning.wav', import.meta.url).href),
  intermission: new Audio(new URL('@/assets/Sounds/pacman_intermission.wav', import.meta.url).href),
};

const chompLoop = new Audio(new URL('@/assets/Sounds/pacman_chomp.wav', import.meta.url).href);
chompLoop.loop = true;

let chompTimeout: number | null = null;
let chompDurationMs = 200; // Default fallback

chompLoop.addEventListener('loadedmetadata', () => {
  chompDurationMs = chompLoop.duration * 1000;
});

onMounted(() => {
  for (const sound of Object.values(sounds)) {
    sound.volume = volume.value * 0.2;
  }
  chompLoop.volume = volume.value * 0.2;
});

function playSound(name: keyof typeof sounds) {
  const base = sounds[name];
  if (!base) return;

  const instance = base.cloneNode() as HTMLAudioElement;
  instance.volume = volume.value * 0.2;
  instance.play().catch(() => {});
}

function startChomp() {
  if (chompLoop.paused) {
    chompLoop.currentTime = 0;
    chompLoop.play().catch(() => {});
  }

  if (chompTimeout !== null) clearTimeout(chompTimeout);

  chompTimeout = window.setTimeout(() => {
    chompLoop.pause();
    chompLoop.currentTime = 0;
    chompTimeout = null;
  }, chompDurationMs);
}

export { playSound, startChomp, volume };

export default {
  name: 'SoundHandler'
};
</script>
