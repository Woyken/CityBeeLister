import vue from 'vue';
import router from './router';
// If we AppVue import goes above router, router stops working for some reason.
// tslint:disable-next-line:ordered-imports
import AppVue from './components/App.vue';

import 'bulma/css/bulma.css';
// import './css/app.css'

const vueInstance = new vue({
    router,
    // tslint:disable-next-line:object-literal-sort-keys
    data: {
        exampleProperty: String,
    },
    el: '#app',
    render: h => h(AppVue, {
        props: {
            propMessage: 'World',
        },
    }),
});
