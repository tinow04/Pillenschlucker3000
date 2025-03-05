<script setup lang="ts">
import HeaderTitle from "@/components/feature/home/src/components/HeaderTitle.vue";
import ButtonContainer from "@/components/feature/home/src/components/ButtonContainer.vue";
import ProfileButton from "@/components/feature/home/src/components/ProfileButton.vue";
import BoardContainer from "@/components/feature/home/src/components/BoardContainer.vue";
import PacmanTransition from "@/components/feature/home/src/components/PacmanTransition.vue";
import ImageBottom from "@/components/feature/home/src/components/ImageBottom.vue";
</script>

<template>
  <div class="main-page">
    <HeaderTitle />
    <ProfileButton />
    <ButtonContainer />
    <BoardContainer />
    <ImageBottom />
    <PacmanTransition />
  </div>
</template>

<style scoped>
.main-page {
  background-color: #162034;
  font-family: "Jersey 10", serif;
  overflow: hidden;
  user-select: none;
}
</style>
