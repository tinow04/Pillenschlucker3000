<script setup lang="ts">
  import PacmanObject from './PacmanObject.vue';

</script>

<template>
   <div class="gamefield">
    <PacmanObject></PacmanObject>
   </div>
</template>

<style scoped>
  .gamefield {
    width: 500px;
    height: 500px;
    background-color: blue;
  }
</style>