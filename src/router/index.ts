import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TeamsView from '@/views/TeamsView.vue'
import TeamView from '@/views/TeamView.vue'
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
    {
      path: '/teams',
      name: 'teams',
      component: TeamsView,
    },
    {
      path: '/team/:id',
      name: 'team',
      component: TeamView,
    },
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
