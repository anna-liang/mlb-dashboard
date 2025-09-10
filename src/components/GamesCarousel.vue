<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import GameCard from './GameCard.vue'

const games: any[] = ref([])

onMounted(async () => {
  try {
    const scheduleResult = await axios.get(`/api/v1/schedule?sportId=1`)
    scheduleResult.data.dates[0].games.forEach((game) => {
      games.value.push({
        id: game.gamePk,
        date: game.gameDate,
        status: game.status.abstractGameState,
        awayTeamId: game.teams.away.team.id,
        awayTeamName: game.teams.away.team.name,
        awayTeamScore: game.teams.away.score,
        homeTeamId: game.teams.home.team.id,
        homeTeamName: game.teams.home.team.name,
        homeTeamScore: game.teams.home.score,
      })
    })
  } catch (error) {
    console.error('Error fetching schedule', error)
  }
})
</script>

<template>
  <Carousel :items-to-show="5.5" :wrap-around="true" :autoplay="5000">
    <Slide v-for="game in games" :key="game.id">
      <GameCard
        :status="game.status"
        :away-team-name="game.awayTeamName"
        :away-team-score="game.awayTeamScore"
        :home-team-name="game.homeTeamName"
        :home-team-score="game.homeTeamScore"
      />
    </Slide>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>
