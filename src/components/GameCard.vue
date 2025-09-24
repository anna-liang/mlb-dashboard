<script setup lang="ts">
import dayjs from 'dayjs'
import { defineProps } from 'vue'
const props = defineProps({
  status: String,
  date: String,
  awayTeamId: Number,
  awayTeamName: String,
  awayTeamScore: Number,
  homeTeamId: Number,
  homeTeamName: String,
  homeTeamScore: Number,
})

const getGameStatusStyle = () => {
  if (props.status === 'Live') {
    return ['bg-red-600', 'text-white']
  } else if (props.status === 'Preview') {
    return ['bg-green-600', 'text-white']
  } else {
    // status === 'Final'
    return ['bg-gray-200', 'text-gray-800']
  }
}
</script>

<template>
  <div class="flex flex-col w-md p-6 shadow-md rounded-xl justify-center">
    <div class="flex justify-center mb-2">
      <div :class="getGameStatusStyle()" class="w-auto rounded-md items-center px-2 pb-0.5">
        {{ status?.toUpperCase() }}
      </div>
    </div>
    <p class="text-gray-600">{{ dayjs(date).format('MMM D YYYY h:mm a') }}</p>
    <div class="flex flex-row justify-between items-center">
      <div class="flex flex-col items-center">
        <!-- TODO: Update bg colour based on team -->
        <div class="flex w-16 h-16 bg-blue-950 rounded-4xl justify-center items-center mr-8">
          <img
            class="w-10 h-10"
            :src="`https://www.mlbstatic.com/team-logos/team-cap-on-dark/${awayTeamId}.svg`"
          />
        </div>
        <p class="mt-2">{{ awayTeamName }}</p>
      </div>
      <p class="mb-8 text-3xl">{{ awayTeamScore }}</p>
      <div class="flex grow-1"></div>
      <p class="mb-8 text-3xl">{{ homeTeamScore }}</p>
      <div class="flex flex-col items-center">
        <!-- TODO: Update bg colour based on team -->
        <div class="flex w-16 h-16 bg-blue-950 rounded-4xl justify-center items-center">
          <img
            class="w-10 h-10"
            :src="`https://www.mlbstatic.com/team-logos/team-cap-on-dark/${homeTeamId}.svg`"
          />
        </div>
        <p class="mt-2">{{ homeTeamName }}</p>
      </div>
    </div>
  </div>
</template>
