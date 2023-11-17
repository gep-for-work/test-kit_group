import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Statistic from '../views/Statistic.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/statistic',
      name: 'statistic',
      component: Statistic
    }
  ]
})

export default router
