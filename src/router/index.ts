import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import PostSeasonView from '@/views/PostSeasonView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // {
    //   path: '/games',
    //   name: 'games',
    //   component: GamesView,
    // },
    // {
    //   path: '/teams',
    //   name: 'teams',
    //   component: TeamView,
    // },
    // {
    //   path: '/players',
    //   name: 'players',
    //   component: PlayersView,
    // },
    {
      path: '/postseason',
      name: 'postseason',
      component: PostSeasonView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
