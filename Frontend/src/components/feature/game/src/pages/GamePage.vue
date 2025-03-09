<script setup lang="ts">
import GameField from "@/components/feature/game/src/components/GameField.vue";
</script>

<template>
  <div class="page-container">
    <game-field class="field-box"></game-field>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.field-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
