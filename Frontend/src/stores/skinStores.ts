import { defineStore } from 'pinia'

export const useSkinStore = defineStore('skin', {
  state: () => ({
    selectedSkinSrc: '',
  }),
  actions: {
    setSkin(src: string) {
      this.selectedSkinSrc = src
    },
  },
})
