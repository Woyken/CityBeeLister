import HomePage from '../components/Home.vue'
import Login from '../components/portfolio/Login.vue'
import { RouteConfig } from 'vue-router';

let t: RouteConfig = { component: HomePage, path: "" }

export const routes: RouteConfig[] = [
  { name: 'list', path: '/', component: HomePage },
  { name: 'login', path: '/login', component: Login },
  { path: '*', redirect: '/' }
  // { name: 'counter', path: '/counter', component: CounterExample },
]
