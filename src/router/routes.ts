import { RouteConfig } from 'vue-router';
import HomeVue from '../components/Home.vue';
import LoginVue from '../components/login/Login.vue';

const t: RouteConfig = { component: HomeVue, path: '' };

export const routes: RouteConfig[] = [
  { name: 'list', path: '/', component: HomeVue },
  { name: 'login', path: '/login', component: LoginVue },
  { path: '*', redirect: '/' },
  // { name: 'counter', path: '/counter', component: CounterExample },
];
