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

  const emit = defineEmits<{ (e: 'click'): void }>()

  function handleClick() {
    emit('click');
  }

</script>

<style scoped>

  .Home-Button {
    position: relative;
    margin-top: 10px;
    margin-left: 10px;
    width: 10vw;
    height: auto;
    background-color: black;
    color: white;
    font-family: "Jersey 10", serif;
    border: none;
    border-radius: 1rem;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
    font-size: clamp(24px, 4vw, 48px);
    cursor: pointer;
    transition: 0.2s ease-in-out;
    transform-origin: center;
  }

  .Home-Button:hover {
    transform: scale(1.02);
    font-size: clamp(2rem, 2.5vw + 1rem, 3.2rem);
    background-color: #222;
  }

  .HomeButton-Container {
    padding: 50px;
  }

  @media (max-width: 1366px) {
    .Home-Button {
      top: 1.8%;
      left: 1%;
      padding: 0.4rem 0.8rem;
      font-size: clamp(20.8px, 3vw, 38.4px);
      height: auto;
    }
  }

  @media (max-width: 1024px) {
    .Home-Button {
      top: 1.5%;
      left: 0.8%;
      padding: 0.3rem 0.6rem;
      font-size: clamp(19.2px, 2.5vw, 32px);
      height: auto;
    }
  }

  @media (max-width: 800px)  {
    .Home-Button {
      top: 1rem;
      left: 0.5rem;
      padding: 0.25rem 0.5rem;
      font-size: clamp(16px, 2vw, 25.6px);
      height: auto;

    }
  }

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
