<template>
  <header class="title">
    <h1>PACMAN</h1>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>

<style scoped>
.title {
  color: yellow;
  font-size: 6rem;
  text-align: center;
  margin-top: -40rem;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
}
</style>
