import vue from 'vue';
import vueRouter from 'vue-router';
import { routes } from './routes';

vue.use(vueRouter);

const router = new vueRouter({
    routes,
  // tslint:disable-next-line:object-literal-sort-keys
    base: 'CityBeeLister',
    mode: 'hash',
});

export default router;
