<template>
  <div class="form-box">
    <h2>Anmelden</h2>
    <form @submit.prevent="handleLoginSubmit">
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
      <button type="submit" class="button">Login</button>
    </form>
    <p>
      Noch kein Konto?
      <a @click="$emit('toggle-form')">Registrieren</a>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/piniaStore";
import { showToast } from "@/components/devPanel/ToastManager.vue";

const email = ref("");
const password = ref("");

const router = useRouter();
const userStore = useUserStore();

const handleLoginSubmit = async () => {
  try {
    const response = await fetch("http://localhost/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      showToast(data.message || "Login fehlgeschlagen", "error");
      return;
    }

    userStore.setUserId(data.user.id);
    userStore.setUsername(data.user.name);
    showToast("Login erfolgreich", "success");
    router.push("/");
  } catch (error) {
    console.error("Fehler:", error);
    showToast("Login fehlgeschlagen. Bitte versuchen Sie es erneut.", "error");
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
