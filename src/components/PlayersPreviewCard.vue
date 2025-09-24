<script setup lang="ts">
import { defineProps } from 'vue'
import PlayerPreviewHeadshot from './PlayerPreviewHeadshot.vue'
defineProps({
  roster: Array,
})
</script>

<template>
  <div class="shadow-md flex flex-wrap w-fit max-h-400 gap-3 rounded-lg p-4">
    <div v-for="player in roster" class="">
      <PlayerPreviewHeadshot :id="player.id" :name="player.name" />
    </div>
  </div>
</template>
