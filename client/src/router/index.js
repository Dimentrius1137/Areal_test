import { createRouter, createWebHistory } from 'vue-router'
import newArticle from '@/pages/newArticle.vue'
import Home from '@/pages/Home.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/addArticle',
      component: newArticle
    },
  ]
})

export default router
