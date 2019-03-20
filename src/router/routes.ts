import { RouteConfig } from 'vue-router';
import CarListVue from '../components/CarList/CarList.vue';
import LoginVue from '../components/login/Login.vue';

const t: RouteConfig = { component: CarListVue, path: '' };

export const routes: RouteConfig[] = [
  { name: 'carList', path: '/', component: CarListVue },
  { name: 'login', path: '/login', component: LoginVue },
  { path: '*', redirect: '/' },
  // { name: 'counter', path: '/counter', component: CounterExample },
];
