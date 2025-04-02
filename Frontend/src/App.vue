<template>
  <router-view />
  <ToastManager />
  <DevPanel />
</template>

<script>
import ToastManager from "@/components/ToastManager.vue";
import DevPanel from "@/components/DevPanel.vue";

export default {
  components: {
    ToastManager,
    DevPanel
  }
};
</script>
