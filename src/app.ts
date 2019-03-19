import Vue from "vue";
import router from "./router";
import App from './components/App.vue'

import 'bulma/css/bulma.css'
// import './css/app.css'

new Vue({
    el: '#app',
    router: router,
    render: h => h(App, {
        props: {
            propMessage: 'World'
        }
    }),
    data: {
        exampleProperty: String
    }
})
