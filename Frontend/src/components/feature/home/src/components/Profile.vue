<template>
  <div class="profile-picture">
    <button class="profile-button">
      <img src="@/assets/profile.png" alt="Image could not load" />
    </button>
  </div>
</template>

<script>
export default {
  name: "ProfileComponent",
};
</script>

<style scoped>
.profile-picture {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.profile-button {
  background: none;
  border: none;
  cursor: pointer;
}

.profile-button img {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s ease-in-out;
}

.profile-button img:hover {
  transform: scale(1.1);
}
</style>
