<script setup lang="ts">
import { useRoute } from 'vue-router'
import axios from 'axios'
import { reactive, onMounted } from 'vue'

const route = useRoute()
    const playerId = route.params.id
    const player = reactive({
      id: playerId,
      name: '',
      pronunciation: '',
      primaryNumber: '',
      birthData: {
        birthDate: '',
        age: 0,
        birthCity: '',
        birthStateProvince: '',
        birthCountry: ''
      },
      height: '',
      weight: 0,
      primaryPosition: {
        code: '',
        name: '',
        type: '',
        abbreviation: ''
      },
      draftYear: 0,
      mlbDebutDate: '',
      batSide: {
        code: '',
        description: ''
      },
      pitchHand: {
        code: '',
        description: ''
      },
      strikeZoneTop: 0,
      strikeZoneBottom: 0,
    })

onMounted(async () => {
  try {
    const playerResponse = await axios.get(
      `/api/v1/people/${player.id}`,
    )
    if (playerResponse.data.people.length > 0) {
      const playerData = playerResponse.data.people[0]
      player.name = playerData.fullName
      player.pronunciation = playerData.pronunciation
      player.primaryNumber = playerData.primaryNumber
      player.birthData.birthDate = playerData.birthDate
      player.birthData.age = playerData.currentAge
      player.birthData.birthCity = playerData.birthCity
      player.birthData.birthStateProvince = playerData.birthStateProvince
      player.birthData.birthCountry = playerData.birthCountry
      player.height = playerData.height
      player.weight = playerData.weight
      player.primaryPosition = playerData.primaryPosition
      player.draftYear = playerData.draftYear
      player.mlbDebutDate = playerData.mlbDebutDate
      player.batSide = playerData.batSide
      player.pitchHand = playerData.pitchHand
      player.strikeZoneTop = playerData.strikeZoneTop
      player.strikeZoneBottom = playerData.strikeZoneBottom
    }    
  } catch (error) {
    console.error('Error fetching player', error)
  }

})

</script>

<template>
  <section class="flex flex-col h-screen px-8 mt-8">
    <div class="flex flex-row">
      <div class="w-40 h-auto border border-gray-300">
      <img
        :src="`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${player.id}/headshot/67/current`"
      />
    </div>
    <div class="flex flex-col ml-4">
      <p class="text-2xl font-bold mb-2">{{ player.name }}<span v-if="player.pronunciation" class="ml-2 text-sm text-gray-600">({{  player.pronunciation }})</span></p>
      <p v-if="player.primaryNumber"><span class="font-bold">Number:</span> {{ player.primaryNumber }}</p>
      <p v-if="player.primaryPosition.type"><span class="font-bold">Position:</span> {{ player.primaryPosition.name }}</p>
      <div class="flex flex-row">
        <p v-if="player.batSide.description"><span class="font-bold">Bats:</span> {{ player.batSide.description }}</p>
        <p v-if="player.pitchHand.description" class="ml-1"><span class="font-bold">Throws:</span> {{ player.pitchHand.description }}</p>
      </div>
      <div class="flex flex-row">
        <p v-if="player.height"><span class="font-bold">Height:</span> {{ player.height }}</p>
        <p v-if="player.weight" class="ml-1"><span class="font-bold">Weight:</span> {{ player.weight }} lbs</p>
      </div>
      <p v-if="player.birthData.birthDate"><span class="font-bold">Birthdate:</span> {{ player.birthData.birthDate }} (Age: {{ player.birthData.age }})</p>
      <p v-if="player.birthData.birthCity || player.birthData.birthStateProvince || player.birthData.birthCountry"><span class="font-bold">Birthplace:</span> <span v-if="player.birthData.birthCity">{{ player.birthData.birthCity }}, </span><span v-if="player.birthData.birthStateProvince">{{ player.birthData.birthStateProvince }}, </span><span v-if="player.birthData.birthCountry">{{ player.birthData.birthCountry }}</span></p>
      <p v-if="player.draftYear"><span class="font-bold">Draft Year:</span> {{ player.draftYear }}</p>
      <p v-if="player.mlbDebutDate"><span class="font-bold">MLB Debut Date:</span> {{ player.mlbDebutDate }}</p>
    </div>
  </div>
  </section>
</template>
