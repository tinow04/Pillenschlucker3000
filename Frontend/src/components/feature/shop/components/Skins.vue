<template>
  <div class="skin-container">
    <div
      class="flex-container"
      v-for="(image, index) in displayedSkins"
      :key="index"
    >
      <img
        :src="image.src"
        class="stylingGIF"
        :id="image.name"
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
          handleSelect(index + 1, image.src)
          changeValueOfButton(index + 1)
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import ButtonComponent from './Button.vue'

  import skin1Path from '@/assets/GIFs/Naruto.gif'
  import skin2Path from '@/assets/GIFs/Spongebob.gif'
  import skin3Path from '@/assets/GIFs/Kirby.gif'
  import skin4Path from '@/assets/GIFs/Sonic.gif'
  import skin5Path from '@/assets/GIFs/Ufo.gif'
  import skin6Path from '@/assets/GIFs/Pikachu.gif'
  import skin7Path from '@/assets/GIFs/Paz.gif'
  import skin8Path from '@/assets/GIFs/Discokugel.gif'
  import skin9Path from '@/assets/GIFs/PacManEating.gif'
  import skin10Path from '@/assets/GIFs/Zombee.gif'
  import skin11Path from '@/assets/GIFs/PixelSonic.gif'
  import skin12Path from '@/assets/GIFs/Star.gif'
  import skin13Path from '@/assets/GIFs/Yoshi.gif'
  import skin14Path from '@/assets/PacmanPlayerGhost.gif'
  import skin15Path from '@/assets/GIFs/Geld.gif'

  defineOptions({
    name: 'SkinsComponent'
  })

  const ButtonID = ref<number | null>(null)

  const defaultSelectedSkin = skin9Path


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

  onMounted(() => {
    const stored = localStorage.getItem('selectedSkin')
    if (stored) {
      const i = displayedSkins.findIndex(s => s.src === stored)
      if (i !== -1) ButtonID.value = i + 1
    } else {
      localStorage.setItem('selectedSkin', defaultSelectedSkin)
      ButtonID.value = 1
    }
  })

  function handleSelect(id: number, src: string) {
    ButtonID.value = id
    localStorage.setItem('selectedSkin', src)
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
