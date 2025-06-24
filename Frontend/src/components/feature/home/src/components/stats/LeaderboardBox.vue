<script setup lang="ts">
import StatCard from "@/components/feature/home/src/components/stats/StatCard.vue";

const handleMainpageStats = async () => {
  try {
    const response = await fetch('http://localhost:80/api/mainpage', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Erhaltene Daten:", data);
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
  }
};

</script>

<template>
  <div class="leaderBox">
    <StatCard
      :id="1"
      :name="'Tino'"
      :points="1234"
    />
    <StatCard
      :id="2"
      :name="'Robin'"
      :points="1234"
    />
    <StatCard
      :id="3"
      :name="'Herr Fischer'"
      :points="1234"
    />
  </div>
</template>

<style scoped>

.leaderBox {
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  justify-content: flex-start;
  background-color: #183446;
  margin-left: 1rem;
  border-radius: 1rem;
}

</style>
