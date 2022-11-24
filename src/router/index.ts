import { createRouter, createWebHistory } from 'vue-router'

import Birthday from '../pages/random-congratulation.vue'

const routes = [
  {
    path: '/',
    name: 'Birthday',
    component: Birthday
  },
]

const router = createRouter({ history: createWebHistory(), routes })
export default router