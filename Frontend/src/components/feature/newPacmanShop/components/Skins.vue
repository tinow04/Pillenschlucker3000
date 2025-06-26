<template>
  <div class="skin-container">
    <div
      class="flex-container"
      v-for="(skin, index) in displayedSkins"
      :key="index"
    >
      <img
        :src="ButtonID === index + 1 ? skin.srcGIF : skin.srcPNG"
        class="stylingGIF"
        :id="skin.name"
        :alt="`GIF Skin ${index + 1}`"
      />

      <ButtonComponent
        :label="ButtonID === index + 1 ? 'ACTIVE' : 'SELECT'"
        class-name="Select-Button"
        active-class="selectedButton"
        :is-active="ButtonID === index + 1"
        :id="(index + 1).toString()"
        :value="ButtonID === index + 1 ? 'ACTIVE' : 'SELECT'"
        @click="() => {
          handleSelect(index + 1, skin.srcGIF)
          changeValueOfButton(index + 1)
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import ButtonComponent from './Button.vue'

  import skin1PathGIF from '@/assets/GIFs/Angel.gif'
  import skin1PathPNG from '@/assets/PNGs/Angel2.png'
  import skin2PathGIF from '@/assets/GIFs/Cheese.gif'
  import skin2PathPNG from '@/assets/PNGs/Cheese2.png'
  import skin3PathGIF from '@/assets/GIFs/Deathstar.gif'
  import skin3PathPNG from '@/assets/PNGs/Deathstart2.png'
  import skin4PathGIF from '@/assets/GIFs/Earth.gif'
  import skin4PathPNG from '@/assets/PNGs/Earth2.png'
  import skin5PathGIF from '@/assets/GIFs/Energy.gif'
  import skin5PathPNG from '@/assets/PNGs/Energy2.png'
  import skin6PathGIF from '@/assets/GIFs/Fish.gif'
  import skin6PathPNG from '@/assets/PNGs/Fish2.png'
  import skin7PathGIF from '@/assets/GIFs/Galaxy.gif'
  import skin7PathPNG from '@/assets/PNGs/GalaxyShiny2.png'
  import skin8PathGIF from '@/assets/GIFs/Hog.gif'
  import skin8PathPNG from '@/assets/PNGs/Hog2.png'
  import skin9PathGIF from '@/assets/GIFs/MissPacman.gif'
  import skin9PathPNG from '@/assets/PNGs/MissPacman2.png'
  import skin10PathGIF from '@/assets/GIFs/Moon.gif'
  import skin10PathPNG from '@/assets/PNGs/Moon2.png'
  import skin11PathGIF from '@/assets/GIFs/Pizza.gif'
  import skin11PathPNG from '@/assets/PNGs/Pizza2.png'
  import skin12PathGIF from '@/assets/GIFs/Pokeball.gif'
  import skin12PathPNG from '@/assets/PNGs/Pokeball2.png'
  import skin13PathGIF from '@/assets/GIFs/Shrek.gif'
  import skin13PathPNG from '@/assets/PNGs/Shrek2.png'
  import skin14PathGIF from '@/assets/GIFs/Tomato.gif'
  import skin14PathPNG from '@/assets/PNGs/Tomato2.png'
  import skin15PathGIF from '@/assets/GIFs/pacman.gif'
  import skin15PathPNG from '@/assets/PNGs/Pacman2.png'

  const selectedSkinStorage = 'selectedSkin:v2';

  defineOptions({
    name: 'SkinsComponent'
  })

  const ButtonID = ref<number | null>(null)

  const displayedSkins = [
    { name: 'Angel', srcGIF: skin1PathGIF, srcPNG: skin1PathPNG },
    { name: 'Cheese', srcGIF: skin2PathGIF, srcPNG: skin2PathPNG },
    { name: 'Deathstar', srcGIF: skin3PathGIF, srcPNG: skin3PathPNG },
    { name: 'Earth', srcGIF: skin4PathGIF, srcPNG: skin4PathPNG },
    { name: 'Energy', srcGIF: skin5PathGIF, srcPNG: skin5PathPNG },
    { name: 'Fish', srcGIF: skin6PathGIF, srcPNG: skin6PathPNG },
    { name: 'Galaxy', srcGIF: skin7PathGIF, srcPNG: skin7PathPNG },
    { name: 'Hog', srcGIF: skin8PathGIF, srcPNG: skin8PathPNG },
    { name: 'MissPacman', srcGIF: skin9PathGIF, srcPNG: skin9PathPNG },
    { name: 'Moon', srcGIF: skin10PathGIF, srcPNG: skin10PathPNG },
    { name: 'Pizza', srcGIF: skin11PathGIF, srcPNG: skin11PathPNG },
    { name: 'Pokeball', srcGIF: skin12PathGIF, srcPNG: skin12PathPNG },
    { name: 'Shrek', srcGIF: skin13PathGIF, srcPNG: skin13PathPNG },
    { name: 'Tomato', srcGIF: skin14PathGIF, srcPNG: skin14PathPNG },
    { name: 'Pacman', srcGIF: skin15PathGIF, srcPNG: skin15PathPNG }
  ]

  const defaultSelectedSkin = skin15PathGIF


  const defaultIndex = displayedSkins.findIndex(s => s.srcGIF === defaultSelectedSkin) + 1

  onMounted(() => {
    const stored = localStorage.getItem(selectedSkinStorage);
    if (stored) {
      const i = displayedSkins.findIndex(s => s.srcGIF === stored)
      if (i !== -1) ButtonID.value = i + 1
      if (i !== -1) {
        ButtonID.value = i + 1
      } else {
        ButtonID.value = defaultIndex
        localStorage.setItem(selectedSkinStorage, defaultSelectedSkin)
      }
    } else {
      localStorage.setItem(selectedSkinStorage, defaultSelectedSkin)
      ButtonID.value = defaultIndex
    }
  })

  function handleSelect(id: number, srcGIF: string) {
    ButtonID.value = id
    localStorage.setItem(selectedSkinStorage, srcGIF)
    window.dispatchEvent(new StorageEvent('storage', {
      key: selectedSkinStorage,
      newValue: srcGIF
    }))
  }

  function changeValueOfButton(id: number) {
    ButtonID.value = id
  }
</script>


<style>
  .skin-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2vw;
    max-width: 1200px;
    width: 100vw;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
  }

  .flex-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4.99%;
    border: 5px solid white;
    width: 12rem;
    height: 12rem;
    padding: 0.5rem;
    padding-bottom: 20px;
    box-sizing: border-box;
  }

  .stylingGIF {
    width: auto;
    height: 6.25rem;
    margin-top: 0.9375rem;
  }


  @media (max-width: 1366px)  {
    .stylingGIF {
      height: 5rem;
    }
  }

  @media (max-width: 1024px)  {
    .skin-container {
      grid-template-columns: repeat(3, 1fr);
    }
    .stylingGIF {
      height: 4rem;
    }
  }

  @media (max-width: 800px) {
    .skin-container {
      grid-template-columns: repeat(2, 1fr);

    }
    .stylingGIF {
      height: 3rem;
    }
  }

  @media (max-height: 900px) {
    .stylingGIF {
      height: 5rem;
    }
  }

  @media (max-height: 700px) {
    .stylingGIF {
      height: 5rem;
    }
  }

  @media (max-height: 600px) {
    .stylingGIF {
      height: 5rem;
    }
  }

</style>
