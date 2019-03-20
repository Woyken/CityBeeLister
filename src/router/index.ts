import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'

Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'hash',
  routes,
  base: "CityBeeLister"
})

export default router
