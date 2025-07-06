import { onMounted } from 'vue';
import { useSoundStore } from '@/piniaStore';

let soundStore: ReturnType<typeof useSoundStore>;

const sounds = {
  eatGhost: new Audio(new URL('@/assets/Sounds/pacman_eatghost.wav', import.meta.url).href),
  death: new Audio(new URL('@/assets/Sounds/pacman_death.wav', import.meta.url).href),
  intro: new Audio(new URL('@/assets/Sounds/pacman_beginning.wav', import.meta.url).href),
  intermission: new Audio(new URL('@/assets/Sounds/pacman_intermission.wav', import.meta.url).href),
};

// Chomp Sound Pool
const CHOMP_POOL_SIZE = 3;
const chompPool: HTMLAudioElement[] = Array.from({ length: CHOMP_POOL_SIZE }, () => {
  const audio = new Audio(new URL('@/assets/Sounds/pacman_chomp.wav', import.meta.url).href);
  audio.volume = 0.2;
  return audio;
});

let currentChompIndex = 0;
let chompCooldown = false;

onMounted(() => {
  soundStore = useSoundStore();
  const volume = soundStore.volume * 0.2;

  for (const sound of Object.values(sounds)) {
    sound.volume = volume;
  }

  for (const chomp of chompPool) {
    chomp.volume = volume;
  }
});

function playSound(name: keyof typeof sounds) {
  if (!soundStore) soundStore = useSoundStore();

  const base = sounds[name];
  if (!base) return;

  const instance = base.cloneNode() as HTMLAudioElement;
  instance.volume = soundStore.volume * 0.2;
  instance.play().catch(() => {});
}

function playChomp() {
  if (chompCooldown) return;
  if (!soundStore) soundStore = useSoundStore();

  const chomp = chompPool[currentChompIndex];
  chomp.currentTime = 0;
  chomp.volume = soundStore.volume * 0.2;

  chomp.play().catch(() => {});
  chompCooldown = true;

  chomp.onended = () => {
    chompCooldown = false;
  };

  currentChompIndex = (currentChompIndex + 1) % CHOMP_POOL_SIZE;
}

export { playSound, playChomp };


