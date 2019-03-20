import vue from 'vue';
import vueClassComponent from 'vue-class-component';

import { RouteConfig } from 'vue-router';
import { routes } from '../../router/routes';

@vueClassComponent({
    components: {},
    name: 'Header',
    props: {
        propMessage: String,
    },
})
export default class Header extends vue {
    public isActive: boolean = false;
    public routes: RouteConfig[] = routes;

    public toggleNav() {
        this.isActive = !this.isActive;
    }
}
