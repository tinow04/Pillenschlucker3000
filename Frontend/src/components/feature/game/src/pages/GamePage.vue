<script setup lang="ts">
import GameField from "@/components/feature/game/src/components/GameField.vue";
</script>

<template>
  <div class="page-container">
    <h3>
      You’ve successfully created a project with Vue
    </h3>
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
