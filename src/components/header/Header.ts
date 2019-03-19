import Vue from 'vue'
import Component from 'vue-class-component'

import { routes } from '../../router/routes'
import { RouteConfig } from 'vue-router';


@Component({
	name: "Header",
  	props: {
    	propMessage: String
	  },
	  components: {
	}
})
export default class Header extends Vue {
	isActive: boolean = false;
	routes: RouteConfig[] = routes;

	toggleNav() {
		this.isActive = !this.isActive;
	}
}
