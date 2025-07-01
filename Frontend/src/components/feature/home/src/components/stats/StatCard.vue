<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useUserStore} from "@/piniaStore";


  onMounted(() => {
    fetchScore();
  });

  const props = defineProps <{
    id: number
    name: string
  }>();

  const highscore = ref(0);
  const user = ref("Could not load data");

  const userStore = useUserStore();

  const formatScore = (val: number | null): string => {
    return val !== null ? val.toLocaleString("de-DE") : "...";
  };

  const fetchScore = async () => {
    const rankID = props.id
    try {
      console.log("userId: ", userStore.userId);
      const response = await fetch(`http://localhost/api/homepage/leaderboard?rankID=${rankID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json(); // z.B. { score: 3123 }

      console.log("data.score: ", data.score);
      console.log("data.username: ", data.name);

      highscore.value = data.score;
      user.value = data.name;

      console.log('Highscore:', highscore);
      console.log("highscore.value: ", highscore.value);
      return highscore;
    } catch (error) {
      console.error('Fehler beim Abrufen des Highscores:', error);
    }
  };

</script>

<template>
  <span class="grid">
    <a class="id"> {{ props.id }}. </a>
    <a class="name"> {{ user }} </a>
    <a class="points"> {{ formatScore(highscore) }} </a>
  </span>
</template>

<style scoped>

.grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  width: 100%;
  font-size: 2rem;
  align-items: center;
}

.id {
  justify-self: start;
}

.name {
  justify-self: center;
}

.points {
  justify-self: end;
}

</style>
