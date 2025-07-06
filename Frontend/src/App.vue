<script setup>
import ToastManager from "@/components/devPanel/ToastManager.vue";
import DevPanel from "@/components/devPanel/DevPanel.vue";
import sounds from "@/components/sounds/sounds.ts";
</script>

<template>
  <router-view />
  <ToastManager />
  <DevPanel />
  <sounds />
</template>

<style scoped></style>
