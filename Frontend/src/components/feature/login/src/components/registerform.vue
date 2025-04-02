<template>
  <div class="form-box">
    <h2>Registrieren</h2>
    <form @submit.prevent="registerUser"> <!-- // NEU -->
      <input v-model="username" type="text" placeholder="Benutzername" required>
      <input v-model="email" type="email" placeholder="Email" required> <!-- // NEU -->
      <input v-model="password" type="password" placeholder="Passwort" required>
      <input v-model="passwordRepeat" type="password" placeholder="Passwort wiederholen" required>
      <button type="submit" class="button">Registrieren</button>
    </form>
    <p>{{ message }}</p> <!-- // NEU -->
    <p>Schon ein Konto? <a @click="$emit('toggle-form')">Anmelden</a></p>
  </div>
</template>

<script>
import { ref } from "vue";
import { showToast} from "@/components/ToastManager.vue";

export default {
  name: "RegisterForm",
  setup(_, { emit }) {
    const username = ref("");
    const email = ref(""); // NEU
    const password = ref("");
    const passwordRepeat = ref("");
    const message = ref(""); // NEU

    // NEU
    const registerUser = async () => {
      if (password.value !== passwordRepeat.value) {
        message.value = "Passwörter stimmen nicht überein";
        return;
      }

      try {
        const response = await fetch("http://localhost:3001/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value
          })
        });

        const data = await response.json();
        message.value = data.message;
        console.log("Registrierung erfolgreich:", data);
        showToast("Registrierung erfolgreich", "success")

      } catch (error) {
        message.value = "Fehler bei der Registrierung";
        console.error(error);
      }
    };
    // ENDE NEU

    return {
      username,
      email, // NEU
      password,
      passwordRepeat,
      message, // NEU
      registerUser // NEU
    };
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
