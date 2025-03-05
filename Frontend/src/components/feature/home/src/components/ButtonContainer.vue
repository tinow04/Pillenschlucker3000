<script setup lang="ts">
const startTransition = () => {
  const overlay = document.querySelector(".black-overlay");
  const pacman = document.getElementById("pacman");
  const mouth = document.getElementById("mouth");

  pacman?.classList.add("move");

  let open = true;
  let eatInterval = setInterval(() => {
    mouth?.setAttribute("points", open ? "50,50 100,40 100,60" : "50,50 100,20 100,80");
    open = !open;
  }, 150);

  for (let i = 0; i < 400; i++) {
    let pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.style.animationDelay = `${Math.random() * 0.6}s`;
    overlay?.appendChild(pixel);
  }

  overlay?.classList.add("fill");

  setTimeout(() => {
    clearInterval(eatInterval);
    window.location.href = "ingame.html";
  }, 1800);
};
</script>

<template>
  <div class="button-container">
    <button class="button" @click="startTransition">PLAY</button>
    <button class="button">HOW TO</button>
    <button class="button">SETTINGS</button>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  min-height: 100vh;
  margin-top: -3rem;
}

.button {
  width: 17rem;
  height: 5rem;
  background-color: black;
  color: white;
  font-family: "Jersey 10", serif;
  border: none;
  border-radius: 1rem;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
  font-size: 3rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.button:hover {
  transform: scale(1.02);
  font-size: 3.2rem;
  background-color: #222;
}
</style>
