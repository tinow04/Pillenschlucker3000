<script setup>
import ToastManager from "@/components/devPanel/ToastManager.vue";
import DevPanel from "@/components/devPanel/DevPanel.vue";
import Sounds from "@/components/sounds/sounds.vue";
</script>

<template>
  <router-view />
  <ToastManager />
  <DevPanel />
  <Sounds />
</template>

<style scoped></style>
