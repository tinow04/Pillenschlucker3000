<template>
  <div class="form-box">
    <h2>Registrieren</h2>
    <form @submit.prevent="registerUser">
      <input
        v-model="username"
        type="text"
        placeholder="Benutzername"
        required
      />
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Passwort"
        required
      />
      <input
        v-model="passwordRepeat"
        type="password"
        placeholder="Passwort wiederholen"
        required
      />
      <button type="submit" class="button">Registrieren</button>
    </form>

    <p>
      Schon ein Konto?
      <a @click="$emit('toggle-form')">Anmelden</a>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { showToast } from "@/components/devPanel/ToastManager.vue";
import { useUserStore } from "@/piniaStore";

const username = ref("");
const email = ref("");
const password = ref("");
const passwordRepeat = ref("");

const router = useRouter();
const userStore = useUserStore();

const registerUser = async () => {
  if (password.value !== passwordRepeat.value) {
    showToast("Passwörter stimmen nicht überein", "error");
    return;
  }

  try {
    const response = await fetch("http://localhost/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      showToast(data.message || "Fehler bei der Registrierung", "error");
      return;
    }

    showToast("Registrierung erfolgreich", "success");
    userStore.setUserId(data.user.id);
    router.push("/");
  } catch (err) {
    console.error(err);
    showToast("Fehler bei der Registrierung", "error");
  }
};
</script>

<style scoped>
.form-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  width: 90%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  text-align: center;
}

.button {
  width: 90%;
  padding: 1rem;
  background-color: black;
  color: white;
  font-size: 2rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
}

.button:hover {
  background-color: #222;
}

a {
  color: yellow;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.5rem;
}
a:hover {
  text-decoration: underline;
}
</style>
