<template>
<div class="main-container">
  <div class="button-container">
    <button class="Home-Button" @click="switchPageHome">HOME</button>
  </div>
    <Buttons />
    <Skins />
    <SelectButton />
    <ProgressBar />
    <div class="grid-wrapper">
      <div class="skin-container">
        <div class="flex-container" v-for="(image, index) in displayedSkins" :key="index">
          <img :src="image.src" class="stylingGIF" :id="image.name" :alt="`GIF Skin ${index + 1}`" />
          <button
            class="Select-Button"
            :class="{ selectedButton: ButtonID === index + 1 }"
            :id="`${index + 1}`"
            :value="ButtonID === index + 1 ? 'ACTIVE' : 'SELECT'"
            @click="handleSelect(index + 1, image.src);changeValueOfButton(index + 1)"
          >
            {{ ButtonID === index + 1 ? 'ACTIVE' : 'SELECT' }}
          </button>
          <!--<button class="progress-bar">"Progress Bar"</button>-->
        </div>
      </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSkinStore } from '../../../../stores/skinStores'

import skin1Path from '@/assets/Naruto.gif'
import skin2Path from '@/assets/Spongebob.gif'
import skin3Path from '@/assets/Kirby.gif'
import skin4Path from '@/assets/Sonic.gif'
import skin5Path from '@/assets/Ufo.gif'
import skin6Path from '@/assets/Pikachu.gif'
import skin7Path from '@/assets/Paz.gif'
import skin8Path from '@/assets/Discokugel.gif'
import skin9Path from '@/assets/PacManEating.gif'
import skin10Path from '@/assets/Zombee.gif'
import skin11Path from '@/assets/PixelSonic.gif'
import skin12Path from '@/assets/Star.gif'
import skin13Path from '@/assets/Yoshi.gif'
import skin14Path from '@/assets/PacmanPlayerGhost.gif'
import skin15Path from '@/assets/Geld.gif'

import Skins from '../components/Skins.vue'
import SelectButton from '../components/Select-Button.vue'
import Buttons from '../components/Home-Button.vue'

defineOptions({
  name: 'SkinSelectionPage',
})

const router = useRouter()
const skinStore = useSkinStore()

const ButtonID = ref<number | null>(null)
const currentImageSource = ref<string | null>(null)

const displayedSkins = [
  { src: skin1Path, name: 'Goku' },
  { src: skin2Path, name: 'Spongebob' },
  { src: skin3Path, name: 'Kirby' },
  { src: skin4Path, name: 'Sonic' },
  { src: skin5Path, name: 'UFO' },
  { src: skin6Path, name: 'Pikachu' },
  { src: skin7Path, name: 'Mario' },
  { src: skin8Path, name: 'Discokugel' },
  { src: skin9Path, name: 'NyanCat' },
  { src: skin10Path, name: 'Zombee' },
  { src: skin11Path, name: 'MarioStiefel' },
  { src: skin12Path, name: 'Minecraft' },
  { src: skin13Path, name: 'Yoshi' },
  { src: skin14Path, name: 'Pokemon' },
  { src: skin15Path, name: 'Geld' },
]


function switchPageHome() {
  router.push('/')
}

function handleSelect(id: number, image: string) {
  ButtonID.value = id
  currentImageSource.value = image
  skinStore.setSkin(image)
}

function changeValueOfButton(id: number) {
  ButtonID.value = id
}
</script>

<style scoped>
body {
  background-color: #162034;
}


</style>
