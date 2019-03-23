// Import the core Vue.js dependency.
import vue from 'vue';
// Import the Vue.js class component.
import vueClassComponent from 'vue-class-component';

import authorizationHelper from '../authorizationHelper';
import HeaderVue from './header/Header.vue';
import SidebarVue from './header/Sidebar.vue';

@vueClassComponent({
    components: {
        HeaderVue,
        SidebarVue,
    },
    name: 'App',
})
export default class App extends vue {
    public mounted() {
        window.onpopstate = (event) => {
            if (authorizationHelper.isAuthorized &&
                this.$route.path === '/login') {
                this.$router.back();
            }
        };
    }
}
