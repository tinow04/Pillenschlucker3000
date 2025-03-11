<template>
  <div class="form-box">
    <h2>Anmelden</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="username" type="text" placeholder="Benutzername" required>
      <input v-model="password" type="password" placeholder="Passwort" required>
      <button type="submit" class="button">Login</button>
    </form>
    <p>Noch kein Konto? <a @click="$emit('toggle-form')">Registrieren</a></p>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "LoginForm",
  setup() {
    const username = ref("");
    const password = ref("");

    const handleLogin = () => {
      console.log("Login mit:", username.value, password.value);
    };

    return { username, password, handleLogin };
  },
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
