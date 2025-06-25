<template>
  <div ref="container" class="profile-picture">
    <span class="username">{{ username }}</span>
    <button class="profile-button" @click="togglePopup">
      <img src="@/assets/profile.png" alt="Image could not load" />
    </button>
    <div v-if="showPopup" class="profile-popup">
      <p v-if="!username">Noch kein Account?</p>
      <router-link v-if="!username" to="/login" class="popup-link">Login</router-link>
      <div v-else>
        <p>Eingeloggt als {{ username }}</p>
        <a class="popup-link" @click.prevent="logout">Abmelden</a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { showToast } from "@/components/ToastManager.vue";

export default {
  name: "ProfileComponent",
  setup() {
    const showPopup = ref(false);
    const username = ref(null);
    const container = ref(null);

    const togglePopup = () => {
      showPopup.value = !showPopup.value;
    };

    const logout = () => {
      localStorage.removeItem("user");
      username.value = null;
      showPopup.value = false;
      showToast("Erfolgreich abgemeldet", "info");
    };

    const handleClickOutside = (event) => {
      if (
        showPopup.value &&
        container.value &&
        !container.value.contains(event.target)
      ) {
        showPopup.value = false;
      }
    };

    onMounted(() => {
      const user = localStorage.getItem("user");
      if (user) {
        username.value = JSON.parse(user).username;
      }
      document.addEventListener("mousedown", handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("mousedown", handleClickOutside);
    });

    return {
      showPopup,
      togglePopup,
      username,
      logout,
      container
    };
  },
};
</script>

<style scoped>
.profile-picture {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.username {
  font-size: 2rem;
  color: white;
  white-space: nowrap;
  direction: rtl;
  text-align: right;
  max-width: 15rem;
  overflow: hidden;
  text-overflow: ellipsis;
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
