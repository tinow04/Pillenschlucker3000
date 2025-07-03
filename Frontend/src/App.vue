<script setup>
import ToastManager from "@/components/devPanel/ToastManager.vue";
import DevPanel from "@/components/devPanel/DevPanel.vue";
import sounds from "@/components/sounds/sounds.vue";
</script>

<template>
  <router-view />
  <ToastManager />
  <DevPanel />
  <sounds />
</template>

<style scoped></style>
