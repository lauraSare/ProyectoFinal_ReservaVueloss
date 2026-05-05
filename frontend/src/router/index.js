import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Login from '../views/Login.vue'
import Registro from '../views/Registro.vue'
import Dashboard from '../views/Dashboard.vue'
import Vuelos from '../views/Vuelos.vue'
import Pasajeros from '../views/Pasajeros.vue'
import Reservas from '../views/Reservas.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Rutas públicas
    { path: '/', component: LandingPage },
    { path: '/login', component: Login },
    { path: '/registro', component: Registro },

    // Rutas protegidas
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/vuelos', component: Vuelos, meta: { requiresAuth: true } },
    { path: '/pasajeros', component: Pasajeros, meta: { requiresAuth: true } },
    { path: '/reservas', component: Reservas, meta: { requiresAuth: true } },

    // Página 404
    { path: '/:pathMatch(.*)*', component: NotFound },
  ],
})

// Proteger rutas que requieren autenticación
router.beforeEach((to, from, next) => {
  const usuario = localStorage.getItem('usuario')
  if (to.meta.requiresAuth && !usuario) {
    next('/login')
  } else {
    next()
  }
})

export default router
