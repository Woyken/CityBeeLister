import vue from 'vue';
import vueClassComponent from 'vue-class-component';
import { GetCityBeeData } from '../../getData';
import router from '../../router';

@vueClassComponent({
    name: 'Login',
})

export default class Login extends vue {
    public username!: string;
    public password!: string;

    public login() {
        new GetCityBeeData().getLoginToken(this.username, this.password).then((loginResponse) => {

            localStorage.setItem('CityBeeToken', loginResponse.access_token);
            router.replace('/');
        });
    }
}
