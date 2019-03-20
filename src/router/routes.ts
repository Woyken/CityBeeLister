import { RouteConfig } from 'vue-router';
import AboutVue from '../components/about/About.vue';
import CarListVue from '../components/carList/CarList.vue';
import LoginVue from '../components/login/Login.vue';

const t: RouteConfig = { component: CarListVue, path: '' };

export const routes: RouteConfig[] = [
  { name: 'Cars List', path: '/', component: CarListVue },
  { name: 'Login', path: '/login', component: LoginVue },
  { name: 'About', path: '/about', component: AboutVue },
  { path: '*', redirect: '/' },
  // { name: 'counter', path: '/counter', component: CounterExample },
];
