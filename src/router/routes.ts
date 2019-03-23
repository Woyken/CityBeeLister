import { RouteConfig } from 'vue-router';
import AboutVue from '../components/about/About.vue';
import CarListVue from '../components/carList/CarList.vue';
import LoginComponentVue from '../components/login/LoginComponent.vue';
import MyReservationVue from '../components/myReservation/MyReservation.vue';

const t: RouteConfig = { component: CarListVue, path: '' };

export const routes: RouteConfig[] = [
  { name: 'Cars List', path: '/', component: CarListVue },
  { name: 'Login', path: '/login', component: LoginComponentVue },
  { name: 'About', path: '/about', component: AboutVue },
  { name: 'Reservation', path: '/reservation', component: MyReservationVue },
  { path: '*', redirect: '/' },
  // { name: 'counter', path: '/counter', component: CounterExample },
];
