<script setup lang="ts">
import { defineProps } from 'vue'
import PlayerPreviewHeadshot from './PlayerPreviewHeadshot.vue'
defineProps({
  roster: Array,
})
</script>

<template>
  <div class="shadow-md grid grid-cols-6 gap-4 w-auto border-2 border-amber-500">
    <div v-for="player in roster" class="">
      <PlayerPreviewHeadshot :id="player.id" :name="player.name" />
    </div>
  </div>
</template>
