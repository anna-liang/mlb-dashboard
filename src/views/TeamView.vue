<script setup lang="ts">
import { useRoute } from 'vue-router'
import axios from 'axios'
import dayjs from 'dayjs'
import { reactive, onMounted } from 'vue'

const route = useRoute()
const teamId = route.params.id
const team = reactive({
  id: teamId,
  name: '',
  venue: '',
  league: '',
  division: '',
  roster: [],
  games: [],
})

onMounted(async () => {
  try {
    const teamsResponse = await axios.get(`/api/v1/teams/${teamId}`)
    const data = teamsResponse.data.teams[0]
    team.name = data.name
    team.venue = data.venue.name
    team.league = data.league.name
    team.division = data.division.name
  } catch (error) {
    console.error('Error fetching teams', error)
  }

  try {
    // TODO: decide if roster is active or 40Man
    const rosterResponse = await axios.get(`/api/v1/teams/${teamId}/roster`)
    const data = rosterResponse.data.roster
    data.forEach((player) => {
      team.roster.push({
        id: player.person.id,
        name: player.person.fullName,
        jerseyNumber: player.jerseyNumber,
        position: player.position.abbreviation,
        status: player.status.description,
      })
    })
  } catch (error) {
    console.error('Error fetching teams', error)
  }

  try {
    const scheduleResponse = await axios.get(
      `/api/v1/schedule?sportId=1&season=${dayjs().year().toString()}&teamId=${teamId}`,
    )
    const data = scheduleResponse.data.dates
    data.forEach((date) => {
      date.games.forEach((game) => {
        team.games.push({
          id: game.gamePk,
          date: game.gameDate,
          awayTeamId: game.teams.away.team.id,
          awayTeamName: game.teams.away.team.name,
          awayTeamScore: game.teams.away.score,
          homeTeamId: game.teams.home.team.id,
          homeTeamName: game.teams.home.team.name,
          homeTeamScore: game.teams.home.score,
          isSpringTraining: game.seriesDescription === 'Spring Training',
        })
      })
    })
  } catch (error) {
    console.error('Error fetching teams', error)
  }

  console.log(team)
})
</script>

<template>
  <section class="text-center flex flex-col items-center h-96">
    <div class="grid grid-cols-6 lg:grid-cols-15 md:grid-cols-10 sm:grid-cols-6 mt-24">
      {{ team }}
    </div>
  </section>
</template>
