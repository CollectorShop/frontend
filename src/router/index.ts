import { useUserStore } from '@/stores/user'
import CompressVideo from '@/views/CompressVideo.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import Register from '@/views/Register.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetail },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/video', name: 'Video', component: CompressVideo },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

// Guard global auth
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  userStore.initAuth() // Init à chaque navigation

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
