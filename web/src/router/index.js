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
  },
  {
    path: '/mytable',
    name: 'mytable',
    component: () => import('../pages/mytable')
  }
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