<script setup lang="ts">

  const props = defineProps <{
    id: number
    name: string
    points: number
  }>();

</script>

<template>
  <span class="grid">
    <a class="id"> {{ props.id }} . </a>
    <a class="name"> {{ props.name }} </a>
    <a class="points"> {{ props.points }} </a>
  </span>
</template>

<style scoped>

.grid {
  display: grid;
  font-size: 2rem;
  margin: 1.5em 1em 1.5em 1em;
  width: 20rem;
}

.id {
  justify-self: start;
}

.name {
  justify-self: center;
}

.points {
  justify-self: end;
}

</style>
