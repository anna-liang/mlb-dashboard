<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'

const alLineup = ref([])
const nlLineup = ref([])

const wildCardRank = ['1', '2', '3']

const sortByWinningPercentage = (a, b) => {
  return b.winningPercentage - a.winningPercentage
}

onMounted(async () => {
  try {
    const alResponse = await axios.get(`/api/v1/standings?leagueId=103`)
    // Keep division leaders and wild card teams separate because division leader has priority over wild card team with higher percentage in another league
    let divisionLeaderTeams = []
    let wildCardTeams = []
    alResponse.data.records.forEach((division) => {
      const divisionLeader = division.teamRecords.filter((team) => team.divisionRank === '1')
      divisionLeaderTeams.push(...divisionLeader)
      const wildcards = division.teamRecords.filter(
        (team) => team.wildCardRank && wildCardRank.includes(team.wildCardRank),
      )
      wildCardTeams.push(...wildcards)
    })

    divisionLeaderTeams = divisionLeaderTeams.map((team) => {
      return {
        name: team.team.name,
        divisionRank: parseInt(team.divisionRank),
        wildCardRank: null,
        winningPercentage: parseFloat(team.winningPercentage),
      }
    })
    wildCardTeams = wildCardTeams.map((team) => {
      return {
        name: team.team.name,
        divisionRank: parseInt(team.divisionRank),
        wildCardRank: parseInt(team.wildCardRank),
        winningPercentage: parseFloat(team.winningPercentage),
      }
    })
    alLineup.value.push(...divisionLeaderTeams.sort(sortByWinningPercentage))
    alLineup.value.push(...wildCardTeams.sort(sortByWinningPercentage))
    console.log(alLineup.value)
  } catch (error) {
    console.error('Error fetching American League standings', error)
  }

  try {
    const nlResponse = await axios.get(`/api/v1/standings?leagueId=104`)
    let divisionLeaderTeams = []
    let wildCardTeams = []
    nlResponse.data.records.forEach((division) => {
      const divisionLeader = division.teamRecords.filter((team) => team.divisionRank === '1')
      divisionLeaderTeams.push(...divisionLeader)
      const wildcards = division.teamRecords.filter(
        (team) => team.wildCardRank && wildCardRank.includes(team.wildCardRank),
      )
      wildCardTeams.push(...wildcards)
    })
    divisionLeaderTeams = divisionLeaderTeams.map((team) => {
      return {
        name: team.team.name,
        divisionRank: parseInt(team.divisionRank),
        wildCardRank: null,
        winningPercentage: parseFloat(team.winningPercentage),
      }
    })
    wildCardTeams = wildCardTeams.map((team) => {
      return {
        name: team.team.name,
        divisionRank: parseInt(team.divisionRank),
        wildCardRank: parseInt(team.wildCardRank),
        winningPercentage: parseFloat(team.winningPercentage),
      }
    })
    nlLineup.value.push(...divisionLeaderTeams.sort(sortByWinningPercentage))
    nlLineup.value.push(...wildCardTeams.sort(sortByWinningPercentage))
    console.log(nlLineup.value)
  } catch (error) {
    console.error('Error fetching American League standings', error)
  }
})
</script>

<template>
  <section class="text-center flex flex-col justify-center items-center h-96">
    <h1 class="text-6xl font-bold mb-4">Postseason 2025</h1>
  </section>
</template>
