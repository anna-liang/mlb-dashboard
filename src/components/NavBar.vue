<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

const isActiveLink = (routePath: string) => {
  const route = useRoute()
  return route.path === routePath
}
</script>

<template>
  <nav class="bg-blue-600">
    <RouterLink
      to="/"
      :class="[
        isActiveLink('/') ? 'bg-blue-900' : 'hover:bg-gray-900 hover:text-white',
        'text-white',
        'px-3',
        'py-2',
        'rounded-md',
      ]"
      >Home</RouterLink
    >
    <RouterLink
      to="/games"
      :class="[
        isActiveLink('/games') ? 'bg-blue-900' : 'hover:bg-gray-900 hover:text-white',
        'text-white',
        'px-3',
        'py-2',
        'rounded-md',
      ]"
      >Games</RouterLink
    >
    <RouterLink
      to="/teams"
      :class="[
        isActiveLink('/teams') ? 'bg-blue-900' : 'hover:bg-gray-900 hover:text-white',
        'text-white',
        'px-3',
        'py-2',
        'rounded-md',
      ]"
      >Teams</RouterLink
    >
    <RouterLink
      to="/players"
      :class="[
        isActiveLink('/players') ? 'bg-blue-900' : 'hover:bg-gray-900 hover:text-white',
        'text-white',
        'px-3',
        'py-2',
        'rounded-md',
      ]"
      >Players</RouterLink
    >
    <RouterLink
      to="/postseason"
      :class="[
        isActiveLink('/postseason') ? 'bg-blue-900' : 'hover:bg-gray-900 hover:text-white',
        'text-white',
        'px-3',
        'py-2',
        'rounded-md',
      ]"
      >Postseason</RouterLink
    >
  </nav>
</template>
