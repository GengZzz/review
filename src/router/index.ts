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
          path: 'snake',
          name: 'snake',
          component: () => import('@/views/snake/Snake.vue'),
        },
        {
          path: 'transform',
          name: 'transform',
          component: () => import('@/views/transform/index.vue'),
        },
      ],
    },
  ],
})

export default router
