<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import GameField from '../components/GameField.vue';

let originalZoom: string | null = null;

onMounted(() => {
  originalZoom = document.documentElement.style.zoom;
  document.documentElement.style.zoom = '0.8';
});

onUnmounted(() => {
  document.documentElement.style.zoom = originalZoom || '';
});
</script>

<template>
  <div class="page-container">
    <GameField class="field-box"></GameField>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: black;
}

.field-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
