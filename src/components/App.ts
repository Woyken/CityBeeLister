// Import the core Vue.js dependency.
import Vue from 'vue'
// Import the Vue.js class component.
import Component from 'vue-class-component'

import { routes } from '../router/routes'
import { RouteConfig } from 'vue-router';

import PageHeader from './header/Header.vue'
import PageSidebar from './header/Sidebar.vue'

@Component({
	name: "App",
  	props: {
    	propMessage: String
	  },
	  components: {
		PageHeader,
		PageSidebar
	}
})
export default class App extends Vue {
	routes: RouteConfig[] = routes;
  // Define properties.
  propMessage!: string

  isActive: boolean = true

  // Inital data.
  msg: number = 123

  // Use prop values for initial data.
  helloMsg: string = 'Hello, ' + this.propMessage

  // Lifecycle hook.
  mounted () {
    this.greet("on mount! ")
  }

  // Computed message function.
  get computedMsg () {
    return 'computed ' + this.msg
  }

  // Greet message function.
  greet (initial: string = "") {
    // alert(initial + 'greeting: ' + this.msg)
  }

  toggleNav() {
	this.isActive = !this.isActive;
  }
}
