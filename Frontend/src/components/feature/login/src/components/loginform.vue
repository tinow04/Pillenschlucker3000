<script setup lang="ts">
import {ref} from "vue";

const username = ref('')
const password = ref('')

const handleLoginSubmit = async () => {
  try {
    const response = await fetch('http://localhost:80/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Erfolg:", data);
    // Weiterleitung oder Erfolgshandling
  } catch (error) {
    console.error('Fehler:', error);
    errorMessage.value = "Login fehlgeschlagen. Bitte versuchen Sie es erneut.";
  }
};

</script>

<template>
  <div class="form-box">
    <h2>Anmelden</h2>
    <form @submit.prevent="handleLoginSubmit">
      <input v-model="username" type="text" placeholder="Benutzername" required>
      <input v-model="password" type="password" placeholder="Passwort" required>
      <button type="submit" class="button">Login</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
    <p>Noch kein Konto? <a @click="$emit('toggle-form')">Registrieren</a></p>
  </div>
</template>

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

p {
  padding-top: 0.5rem;
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
