import { defineStore } from 'pinia'
import { ref, watch } from 'vue';

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: null,
    name: null
  }),
  actions: {
    setUserId(id) {
      this.userId = id
      console.log("piniaStore: ", id, typeof id)
    },
    logout() {
      this.userId = null
      this.name = null;
      this.leaderboardVersion++;
    },
    setUsername(username) {
      this.name = username
      console.log("piniaStore: ", username)
    },
  }
  // @ts-expect-error
  persist: true
})

export const useSoundStore = defineStore('sound', () => {
  const volume = ref(
    Number(localStorage.getItem('globalVolume') ?? '50') / 100
  );

  const isMuted = ref(volume.value === 0);

  watch(volume, (val) => {
    isMuted.value = val === 0;
    localStorage.setItem('globalVolume', String(Math.round(val * 100)));
  });

  function toggleMute() {
    if (isMuted.value) {
      volume.value = 0.5;
    } else {
      volume.value = 0;
    }
  }

  return { volume, isMuted, toggleMute };
});

