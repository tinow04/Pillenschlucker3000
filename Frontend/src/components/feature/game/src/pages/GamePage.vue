<script setup lang="ts">
import GameField from '../components/GameField.vue';
</script>

<template>
  <div class="page-container">
    <h3>
      You’ve successfully created a project with Vue
    </h3>
    <GameField></GameField>
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
