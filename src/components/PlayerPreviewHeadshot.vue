<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  id: Number,
  name: String,
})
</script>

<template>
  <RouterLink :to="`/players/${id}`">
    <div class="w-24 rounded-lg border border-gray-300 overflow-hidden h-50">
      <img
        :src="`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${id}/headshot/67/current`"
      />
      <p class="text-sm">{{ name }}</p>
    </div>
  </RouterLink>
</template>
