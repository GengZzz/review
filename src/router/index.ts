import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: '/snake',
      children: [
        {
          path: '/snake',
          name: 'snake',
          component: () => import('@/views/snake/Snake.vue'),
        },
        {
          path: '/transform',
          name: 'transform',
          redirect: '/globlue',
          children: [
            {
              path: '/globlue',
              name: 'globlue',
              component: () => import('@/views/globlue/globlue.vue'),
            },
            {
              path: '/bounce',
              name: 'bounce',
              component: () => import('@/views/bounce/bounce.vue'),
            },
            {
              path: 'click',
              name: 'click',
              component: () => import('@/views/click/click.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/roll',
      name: 'roll',
      component: () => import('@/views/roll/roll.vue'),
    },
  ],
})

export default router
