<script setup lang="ts"></script>

<template>
  <div class="pacman-container">
    <svg id="pacman" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="yellow" />
      <polygon id="mouth" points="50,50 100,20 100,80" fill="black" />
    </svg>
  </div>
  <div class="black-overlay"></div>
</template>

<style scoped>
.pacman-container {
  position: fixed;
  top: 50%;
  left: -100px;
  width: 50px;
}

#pacman {
  width: 100px;
  height: 100px;
}

.move {
  animation: moveAcross 1.5s ease-in-out forwards;
}

@keyframes moveAcross {
  from {
    transform: translateX(-10vw);
  }
  to {
    transform: translateX(110vw);
  }
}
</style>
