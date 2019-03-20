// Import the core Vue.js dependency.
import Vue from 'vue'
// Import the Vue.js class component.
import Component from 'vue-class-component'

import PageHeader from './header/Header.vue'
import PageSidebar from './header/Sidebar.vue'

@Component({
	name: "App",
	  components: {
		PageHeader,
		PageSidebar
	}
})
export default class App extends Vue {
}
