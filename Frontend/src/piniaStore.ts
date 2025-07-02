import { defineStore } from 'pinia'

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
  },
  persist: true
})
