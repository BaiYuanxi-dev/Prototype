import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/ImageList',
    name: 'ImageList',
    component: () => import('../pages/ImageList'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/mtpg1',
    name: 'mtpg1',
    component: () => import('../pages/mtpg1'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/try',
    name: 'try',
    component: () => import('../pages/try'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../pages/login')
  },
  {
    path: '/mytable',
    name: 'mytable',
    component: () => import('../pages/mytable'),
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/Login') {
    next();
  } else {
    let token = localStorage.getItem('token');

    if (token === 'null' || token === '') {
      next('/Login');
    } else {
      next();
    }
  }
});

export default router