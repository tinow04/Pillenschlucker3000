<template>
  <div class="main-container">
    <div class="button-container">
      <ButtonComponent label="HOME" class-name="Home-Button" @click="switchPageHome" />
    </div>
    <div class="grid-wrapper">
      <SkinsComponent />
    </div>
  </div>
</template>

<script setup lang="ts">
  import ButtonComponent from '../components/Button.vue';
  import SkinsComponent from '../components/Skins.vue';
  import { useRouter } from 'vue-router';

  defineOptions({
    name: 'LockerComponent'
  });

  const router = useRouter();

  function switchPageHome() {
    router.push('/')
  }
</script>

<style>
::-webkit-scrollbar { display: none; }

.main-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .button-container {
    height: calc(100vh - 80vh);
    min-height: 80px;
  }

  .grid-wrapper {
    height: calc(100vh - 20vh);
    overflow-y: scroll;
    overflow-x: hidden;
  }

  /*Verwendung von @media*/

  @media (max-width: 1366px)  {
    .button-container {
      height: calc(100vh - 87vh);
    }

    .grid-wrapper {
      height: calc(100vh - 13vh);
      overflow-y: auto;
      overflow-x: hidden;
    }
  }




</style>
