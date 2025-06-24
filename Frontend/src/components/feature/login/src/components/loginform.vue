<template>
  <div class="form-box">
    <h2>Anmelden</h2>
    <form @submit.prevent="loginUser"> <!-- // NEU -->
      <input v-model="email" type="email" placeholder="Email" required> <!-- // NEU -->
      <input v-model="password" type="password" placeholder="Passwort" required>
      <button type="submit" class="button">Login</button>
    </form>
    <p>{{ message }}</p> <!-- // NEU -->
    <p>Noch kein Konto? <a @click="$emit('toggle-form')">Registrieren</a></p>
  </div>
</template>

<script>
// NEU
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "LoginForm",
  setup() {
    const email = ref("");
    const password = ref("");
    const message = ref("");
    const router = useRouter();

    const loginUser = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.value,
            password: password.value
          })
        });

        const data = await response.json();

        if (response.ok) {
          message.value = "Login erfolgreich!";
          console.log("Eingeloggt:", data);

          // 🔐 Benutzer speichern
          localStorage.setItem("user", JSON.stringify(data.user));
          router.push("/"); // ✅ richtige Weiterleitung

        } else {
          message.value = data.message;
        }
      } catch (error) {
        message.value = "Login fehlgeschlagen";
        console.error(error);
      }
    };

    return {
      email,
      password,
      message,
      loginUser
    };
  },
};
// ENDE NEU
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
