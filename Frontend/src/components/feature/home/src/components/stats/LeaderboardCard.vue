<script setup lang="ts">

  const props = defineProps <{
    tag: string
    stat: string
  }>();

</script>

<template>
  <div class="stat-group">
    <p class="stat-title"> {{ props.tag }}</p>
    <p class="stat-value"> {{ props.stat }} </p>
  </div>
</template>

<style scoped>
  .stat-group {
    margin-bottom: -1.2rem;
  }

  .stat-title {
    margin-bottom: -0.75rem;
    font-size: 2.5rem;
  }

  .stat-value {
    margin-bottom: 1.5rem;
    font-size: 1.6rem;

  }
</style>
