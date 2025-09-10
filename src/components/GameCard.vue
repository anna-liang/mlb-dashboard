<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  status: String,
  awayTeamName: String,
  awayTeamScore: Number,
  homeTeamName: String,
  homeTeamScore: Number,
})
</script>

<template>
  <div>
    <p>{{ status }}</p>
    <p>{{ awayTeamName }}</p>
    <p>{{ awayTeamScore }}</p>
    <p>{{ homeTeamScore }}</p>
    <p>{{ homeTeamName }}</p>
  </div>
</template>
