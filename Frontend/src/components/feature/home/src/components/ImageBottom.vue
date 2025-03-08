<template>
  <div class="bottom-image">
    <img src="@/assets/pacmanwghosts.png" alt="Pac-Man Logo" />
  </div>
</template>

<script>
export default {
  name: "ImageBottomComponent",
};
</script>

<style scoped>
.bottom-image {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>
