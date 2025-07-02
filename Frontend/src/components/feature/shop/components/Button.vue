<template>
  <button
    :id="props.id"
    :class="[props.className, { [props.activeClass]: props.isActive }]"
    @click="handleClick"
  >
    {{ props.label }}
  </button>
</template>

<script setup lang="ts">

defineOptions({
  name: 'ButtonComponent'
});

interface Props {
  label?: string
  className: string
  id?: string
  value?: string
  activeClass?: string
  isActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  activeClass: '',
  isActive: false
});

const emit = defineEmits<{ (e: 'click'): void }>();

function handleClick() {
  emit('click');
}

</script>

<style scoped>

.Select-Button {
  width: 10rem;
  height: 2rem;
  background-color: #FFD44C;
  color: black;
  font-family: "Jersey 10", serif;
  font-weight: normal;
  border: 2px solid #FFE066;
  border-radius: 1rem;
  box-shadow: 2px 2px 8px rgba(54, 54, 54, 0.08);
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  transform-origin: center;

}

.Select-Button:hover {
  background-color: #FFE680;
  box-shadow: 0 0 8px rgba(255, 220, 100, 0.6);
}

.selectedButton {
  width: 10rem;
  height: 2rem;
  background-color: #ffb800;
  color: black;
  font-family: 'Jersey 10', serif;
  font-weight: bold;
  border: 2px solid #ffd700;
  border-radius: 1rem;
  box-shadow: 0 0 12px rgba(255, 184, 0, 0.8);
  font-size: 1.5rem;
  cursor: pointer;
  transform-origin: center;
  transition: all 0.2s ease-in-out;
}

.selectedButton:hover {
  background-color: #ffa000;
  box-shadow: 0 0 16px rgba(255, 160, 0, 1);
}

</style>
