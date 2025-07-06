import { defineStore } from 'pinia'
import { ref, watch } from 'vue';

export const useUserStore = defineStore(
  'user',
  () => {
    const userId            = ref<number | null>(null)
    const name              = ref<string | null>(null)
    const leaderboardVersion = ref<number>(0)

    function setUserId(id: number) {
      userId.value = id
      console.log('piniaStore setUserId:', id)
    }
    function setUsername(username: string) {
      name.value = username
      console.log('piniaStore setUsername:', username)
    }
    function logout() {
      userId.value            = null
      name.value              = null
      leaderboardVersion.value++
      console.log('logged out, new version:', leaderboardVersion.value)
    }

    return {
      userId,
      name,
      leaderboardVersion,
      setUserId,
      setUsername,
      logout,
    }
  },
  { persist: true }
)

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

