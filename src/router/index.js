import { createRouter, createWebHistory } from 'vue-router'
import AgentPage from '@/views/AgentPage.vue'
import Dashboard from '@/views/Dashboard.vue'
import Home from '@/views/PageDeVente.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/agent/:slug', name: 'agent', component: AgentPage },
  { path: '/dashboard/:slug', name: 'dashboard', component: Dashboard },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
