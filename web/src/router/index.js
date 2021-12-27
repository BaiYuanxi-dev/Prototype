import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../pages/login')
  },
  {
    path: '/ImageList',
    name: 'ImageList',
    component: () => import('../pages/ImageList')
  },
  {
    path: '/mtpg1',
    name: 'mtpg1',
    component: () => import('../pages/mtpg1')
  },
  {
    path: '/try',
    name: 'try',
    component: () => import('../pages/try')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../pages/login')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
