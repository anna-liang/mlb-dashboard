<script setup lang="ts">
import { RouterLink } from 'vue-router'
import axios from 'axios'
import { ref, onMounted } from 'vue'

const teams: any[] = ref([])

onMounted(async () => {
  try {
    const teamsResponse = await axios.get(`/api/v1/teams?sportId=1`)
    teamsResponse.data.teams.forEach((team) => {
      teams.value.push({
        id: team.id,
        name: team.name,
        venue: team.venue.name,
        league: team.league.name,
        division: team.division.name,
      })
    })
  } catch (error) {
    console.error('Error fetching teams', error)
  }
})
</script>

<template>
  <section class="text-center flex flex-col items-center h-96">
    <div class="grid grid-cols-6 lg:grid-cols-15 md:grid-cols-10 sm:grid-cols-6 mt-24">
      <!-- TODO: Update bg colour based on team -->
      <div
        v-for="team in teams"
        :key="team.id"
        class="flex w-16 h-16 bg-blue-950 rounded-4xl justify-center items-center m-2"
      >
        <img
          class="w-10 h-10"
          :src="`https://www.mlbstatic.com/team-logos/team-cap-on-dark/${team.id}.svg`"
        />
      </div>
    </div>
  </section>
</template>
