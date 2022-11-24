import { createRouter, createWebHistory } from 'vue-router'

import Congratulation from '../pages/random-congratulation.vue'
import Poem from '../pages/random-poem.vue'

const routes = [
  {
    path: '/congratulation',
    name: 'Congratulation',
    component: Congratulation
  },
  {
    path: '/poem',
    name: 'Poem',
    component: Poem
  },
]

const router = createRouter({ history: createWebHistory(), routes })
export default router