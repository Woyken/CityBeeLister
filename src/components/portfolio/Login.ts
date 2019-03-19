import Vue from "vue";
import Component from 'vue-class-component'
import { GetCityBeeData } from "../../getData";
import router from "../../router";


@Component({
	name: "Login",
})

export default class Login extends Vue {
	username!: string;
	password!: string;

	login() {
		new GetCityBeeData().getLoginToken(this.username, this.password).then((loginResponse) => {

			localStorage.setItem('CityBeeToken', loginResponse.access_token);
			router.replace("/");
		});
	}
}
