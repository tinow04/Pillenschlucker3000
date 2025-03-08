<template>
  <div class="form-box">
    <h2>Registrieren</h2>
    <form @submit.prevent="validatePassword">
      <input v-model="username" type="text" placeholder="Benutzername" required>
      <input v-model="password" type="password" placeholder="Passwort" required>
      <input v-model="passwordRepeat" type="password" placeholder="Passwort wiederholen" required>
      <button type="submit" class="button">Registrieren</button>
    </form>
    <p>Schon ein Konto? <a @click="$emit('toggle-form')">Anmelden</a></p>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "RegisterForm",
  setup(_, { emit }) {
    const username = ref("");
    const password = ref("");
    const passwordRepeat = ref("");

    const validatePassword = () => {
      if (password.value !== passwordRepeat.value) {
        emit("password-mismatch");
        return false;
      }
      console.log("Registrierung mit:", username.value, password.value);
      return true;
    };

    return { username, password, passwordRepeat, validatePassword };
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
