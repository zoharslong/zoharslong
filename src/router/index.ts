import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/ocr",
    name: "Ocr",
    // route level code-splitting
    // this generates a separate chunk (ocr.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Home" */ "../views/Ocr.vue"),
  },
  {
    path: "/licenseplate",
    name: "LicensePlate",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../views/LicensePlate.vue"),
  },
  {
    path: "/pyzohar",
    name: "Pyzohar",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../views/Pyzohar.vue"),
  },
  {
    path: "/reference",
    name: "Reference",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../views/Reference.vue"),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
