<template>
  <div class="profile-picture">
    <button class="profile-button" @click="togglePopup">
      <img src="@/assets/profile.png" alt="Image could not load" />
    </button>
    <div v-if="showPopup" class="profile-popup">
      <p>Noch kein Account?</p>
      <router-link to="/login" class="popup-link">Login</router-link>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "ProfileComponent",
  setup() {
    const showPopup = ref(false);

    const togglePopup = () => {
      showPopup.value = !showPopup.value;
    };

    return { showPopup, togglePopup };
  },
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

/* Popup-Styles passend zum restlichen Design */
.profile-popup {
  position: absolute;
  top: 110%;
  right: 0;
  background-color: #183446;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  text-align: center;
}

.profile-popup p {
  margin: 0 0 0.5rem 0;
  font-size: 1.4rem;
}

.popup-link {
  color: yellow;
  text-decoration: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.popup-link:hover {
  text-decoration: underline;
}
</style>
