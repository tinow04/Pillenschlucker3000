<template>
  <!-- Grid mit allen Skins -->
  <div class="skin-container">
    <div
      v-for="(skin, index) in displayedSkins"
      :key="index"
      class="flex-container"
      :class="{ locked: !isSkinUnlocked(index + 1) }"
    >
      <img
        :src="ButtonID === index + 1 ? skin.srcGIF : skin.srcPNG"
        class="stylingGIF"
        :alt="skin.name"
      />

      <template v-if="!isSkinUnlocked(index + 1)">
        <div class="lock-overlay" @click="showPreview(skin.srcGIF)">
          <div class="lock-icon">
            <img src="@/assets/PNGs/LockForLocker.png" alt="locked" />
          </div>
          <div class="price-overlay">
            <div class="price-tag">{{ skin.price }} 🟡</div>
          </div>
          <div class="lock-content">
            <button class="buy-btn" @click.stop="buySkin(index + 1, skin.price)">
              Buy
            </button>
          </div>
        </div>
      </template>

      <template v-else>
        <ButtonComponent
          :label="ButtonID === index + 1 ? 'ACTIVE' : 'SELECT'"
          class-name="Select-Button"
          active-class="selectedButton"
          :is-active="ButtonID === index + 1"
          @click="handleSelect(index + 1, skin.srcGIF)"
        />
      </template>
    </div>
  </div>

  <template v-if="previewVisible">
    <div class="modal-backdrop" @click="closePreview">
      <div class="modal-content" @click.stop>
        <img :src="previewSrc" alt="Preview Skin" class="preview-gif" />
        <button class="close-btn" @click="closePreview">✕</button>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ButtonComponent from './Button.vue';
import { useUserStore } from '@/piniaStore';


import skin1PathGIF from '@/assets/GIFs/Angel.gif';
import skin1PathPNG from '@/assets/PNGs/Angel2.png';
import skin2PathGIF from '@/assets/GIFs/Cheese.gif';
import skin2PathPNG from '@/assets/PNGs/Cheese2.png';
import skin3PathGIF from '@/assets/GIFs/Deathstar.gif';
import skin3PathPNG from '@/assets/PNGs/Deathstart2.png';
import skin4PathGIF from '@/assets/GIFs/Earth.gif';
import skin4PathPNG from '@/assets/PNGs/Earth2.png';
import skin5PathGIF from '@/assets/GIFs/Energy.gif';
import skin5PathPNG from '@/assets/PNGs/Energy2.png';
import skin6PathGIF from '@/assets/GIFs/Fish.gif';
import skin6PathPNG from '@/assets/PNGs/Fish2.png';
import skin7PathGIF from '@/assets/GIFs/Galaxy.gif';
import skin7PathPNG from '@/assets/PNGs/GalaxyShiny2.png';
import skin8PathGIF from '@/assets/GIFs/Hog.gif';
import skin8PathPNG from '@/assets/PNGs/Hog2.png';
import skin9PathGIF from '@/assets/GIFs/MissPacman.gif';
import skin9PathPNG from '@/assets/PNGs/MissPacman2.png';
import skin10PathGIF from '@/assets/GIFs/Moon.gif';
import skin10PathPNG from '@/assets/PNGs/Moon2.png';
import skin11PathGIF from '@/assets/GIFs/Pizza.gif';
import skin11PathPNG from '@/assets/PNGs/Pizza2.png';
import skin12PathGIF from '@/assets/GIFs/Pokeball.gif';
import skin12PathPNG from '@/assets/PNGs/Pokeball2.png';
import skin13PathGIF from '@/assets/GIFs/Shrek.gif';
import skin13PathPNG from '@/assets/PNGs/Shrek2.png';
import skin14PathGIF from '@/assets/GIFs/Tomato.gif';
import skin14PathPNG from '@/assets/PNGs/Tomato2.png';
import skin15PathGIF from '@/assets/GIFs/pacman.gif';
import skin15PathPNG from '@/assets/PNGs/Pacman2.png';

const selectedSkinStorage = 'selectedSkin:v2';

const skinsUnlocked = ref<Set<number>>(new Set());


const userStore = useUserStore();
const playerId = userStore.userId;

const emit = defineEmits<{
  (e: 'updateCoins', price: number, done: (success: boolean) => void): void
}>();

defineOptions({
  name: 'SkinsComponent'
});

interface Skin {
  name: string;
  srcGIF: string;
  srcPNG: string;
  price : number;
}

const ButtonID = ref<number | null>(null);

const displayedSkins :Skin[]= [
  { name: 'Angel', srcGIF: skin1PathGIF, srcPNG: skin1PathPNG, price: 20000 },
  { name: 'Cheese', srcGIF: skin2PathGIF, srcPNG: skin2PathPNG, price: 500},
  { name: 'Deathstar', srcGIF: skin3PathGIF, srcPNG: skin3PathPNG, price: 1500 },
  { name: 'Earth', srcGIF: skin4PathGIF, srcPNG: skin4PathPNG, price: 2000 },
  { name: 'Energy', srcGIF: skin5PathGIF, srcPNG: skin5PathPNG, price: 5000 },
  { name: 'Fish', srcGIF: skin6PathGIF, srcPNG: skin6PathPNG, price: 1750 },
  { name: 'Galaxy', srcGIF: skin7PathGIF, srcPNG: skin7PathPNG, price: 10000 },
  { name: 'Hog', srcGIF: skin8PathGIF, srcPNG: skin8PathPNG, price: 4000 },
  { name: 'MissPacman', srcGIF: skin9PathGIF, srcPNG: skin9PathPNG, price: 12500 },
  { name: 'Moon', srcGIF: skin10PathGIF, srcPNG: skin10PathPNG, price: 1250 },
  { name: 'Pizza', srcGIF: skin11PathGIF, srcPNG: skin11PathPNG, price: 6000 },
  { name: 'Pokeball', srcGIF: skin12PathGIF, srcPNG: skin12PathPNG, price: 8000 },
  { name: 'Shrek', srcGIF: skin13PathGIF, srcPNG: skin13PathPNG, price: 2000 },
  { name: 'Tomato', srcGIF: skin14PathGIF, srcPNG: skin14PathPNG, price: 750 },
  { name: 'Pacman', srcGIF: skin15PathGIF, srcPNG: skin15PathPNG, price: 0 }
];

const defaultIndex = displayedSkins.findIndex(s => s.price === 0) + 1;
const defaultSelectedSkin = displayedSkins[defaultIndex - 1].srcGIF;

const previewVisible = ref(false);
const previewSrc     = ref<string | null>(null);


onMounted(() => {
  if(!playerId) {
    skinsUnlocked.value.add(15);
  }
  localStorage.removeItem('skinsUnlocked:v1');
  for (let i = 1; i <= displayedSkins.length; i++) {
    fetchSkin(i).then(isUnlocked => {
      if (isUnlocked) {
        skinsUnlocked.value.add(i);
      }
    });
  }


  const storedSkin = localStorage.getItem(selectedSkinStorage)
  if(!playerId){
    ButtonID.value = defaultIndex
    localStorage.setItem(selectedSkinStorage, defaultSelectedSkin)
  } else if (storedSkin) {
    const i = displayedSkins.findIndex(s => s.srcGIF === storedSkin)
    ButtonID.value = i !== -1 ? i + 1 : defaultIndex
    if (i === -1) {
      localStorage.setItem(selectedSkinStorage, defaultSelectedSkin)
    }
  } else {
    ButtonID.value = defaultIndex
    localStorage.setItem(selectedSkinStorage, defaultSelectedSkin)
  }
});

function handleSelect(id: number, srcGIF: string) {
  ButtonID.value = id
  localStorage.setItem(selectedSkinStorage, srcGIF)
  window.dispatchEvent(new StorageEvent('storage', {
    key: selectedSkinStorage,
    newValue: srcGIF
  }))
}


function showPreview(srcGIF: string) {
  previewSrc.value     = srcGIF
  previewVisible.value = true
}

function closePreview() {
  previewVisible.value = false
  previewSrc.value     = null
}

function buySkin(id: number, price: number) {
  emit('updateCoins', price, (success) => {
    if (success) {
      skinsUnlocked.value.add(id);
      unlockSkin(id);
      console.log('Skin gekauft und Coins geupdated.')
    } else {
      console.log('Konnte Coins nicht updaten – Skin nicht freigeschaltet.')
    }
  })
}


function isSkinUnlocked(id: number): boolean {
  return skinsUnlocked.value.has(id)
}

const unlockSkin = async (id: number) => {
  console.log("Unlocking skin with ID:", id);
  try {
    const response = await fetch('http://localhost/api/skin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        playerID: playerId,
        skinID: id
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    console.log('Skin unlocked successfully:', id);
  } catch (error) {
    console.error('Skin unlock failed: ', error);
  }
};

const fetchSkin = async (id: number) => {
  try {
    const params = new URLSearchParams({
      playerID: String(playerId),
      skinID: String(id)
    });
    const response = await fetch(`http://localhost/api/skin?`+params.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const isUnlocked = await response.json();

    console.log('Freigeschalten:', isUnlocked);
    return isUnlocked;
  } catch (error) {
    console.error('Fehler beim Abrufen ob Skin freigeschalten ist:', error);
  }
};
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

.locked {
  position: relative;
  filter: grayscale(80%);
  opacity: 0.6;
}

.lock-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.lock-icon img {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 2;
  width: 2rem;
  height: 2rem;
}

.price-overlay {
  position: absolute;
  top: 1.5rem;
  left: 55%;
  transform: translateX(-50%);
  z-index: 2;
}

.price-tag {
  color: grey;
  font-size: 1.25rem;
  font-weight: bold;
  text-shadow: 0 0 4px #000;
  x: 2.5%;
}

.lock-content {
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  z-index: 2;
}

.buy-btn {
  font-family: "Jersey 10", serif;
  font-size: 1rem;
  font-weight: normal;
}

.buy-btn:hover {
  transform: scale(1.05);
  background-color: grey;
  box-shadow: 0 0 8px rgba(255, 208, 0, 0.8);
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  background: #162034;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.preview-gif {
  width: 8rem;
  height: 8rem;
  margin-bottom: 1rem;
}

.close-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
}
.close-btn:hover {
  color: #FFD44C;
}

</style>
