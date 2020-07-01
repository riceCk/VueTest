import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../view/Home.vue'
import Video from '../view/newVideo.vue'
import Grid from '../view/Grid.vue'
import Charts from '../view/Charts.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/video',
    name: 'Video',
    component: Video
  },
  {
    path: '/grid',
    name: 'Grid',
    component: Grid
  },
  {
    path: '/charts',
    name: 'Charts',
    component: Charts
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../view/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
