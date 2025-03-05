<script setup lang="ts"></script>

<template>
  <div class="image-bottom">
    <img src="@/assets/pacmanwghosts.png" alt="Image could not load" />
  </div>
</template>

<style scoped>
.image-bottom {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.image-bottom img {
  max-width: 100%;
  height: auto;
}
</style>
