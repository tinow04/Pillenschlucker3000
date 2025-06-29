<script setup lang="ts">

const props = defineProps <{
  id: number
  name: string
  points: number
}>();

function getScoreById {

}

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
  grid-template-columns: 1fr 2fr 1fr;
  width: 100%;
  font-size: 2rem;
  align-items: center;
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
