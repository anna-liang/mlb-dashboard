<script setup lang="ts">
import { useRoute } from 'vue-router'
import axios from 'axios'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { reactive, onMounted, ref } from 'vue'
import GameCard from '@/components/GameCard.vue'
import PlayersPreviewCard from '@/components/PlayersPreviewCard.vue'

dayjs.extend(isSameOrAfter)
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
const currentGameIndex = ref(0)

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
          status: game.status.abstractGameState,
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

  console.log(team.roster[0])
  findCurrentGame()
  // console.log(team)
  // console.log(dayjs(team.games[185].date).format('YYYY-MM-DD'))
  // console.log(dayjs().format('YYYY-MM-DD'))
  // console.log(dayjs(team.games[185].date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD'))
})

/**
 * Will find and return the index of today's game or the next game
 * if there is no game today.
 */
const findCurrentGame = () => {
  const gameIndex = team.games.findIndex((game) => dayjs(game.date).isSameOrAfter(dayjs()))
  if (gameIndex !== -1) currentGameIndex.value = gameIndex
}
</script>

<template>
  <section class="text-center flex flex-col items-center h-96">
    <div class="grid justify-items-center">
      <p>{{ team.name.toUpperCase() }}</p>
      <p>{{ team.division }}</p>
      <GameCard
        :status="team.games[currentGameIndex].status"
        :date="team.games[currentGameIndex].date"
        :away-team-id="team.games[currentGameIndex].awayTeamId"
        :away-team-name="team.games[currentGameIndex].awayTeamName"
        :away-team-score="team.games[currentGameIndex].awayTeamScore"
        :home-team-id="team.games[currentGameIndex].homeTeamId"
        :home-team-name="team.games[currentGameIndex].homeTeamName"
        :home-team-score="team.games[currentGameIndex].homeTeamScore"
      />
      <div class="grid grid-cols-2 gap-8 justify-items-center">
        <div>
          <p>Schedule</p>
        </div>
        <div>
          <p>Players</p>
          <PlayersPreviewCard :roster="team.roster" />
        </div>
      </div>
    </div>
  </section>
</template>
