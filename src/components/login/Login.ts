import vue from 'vue';
import vueClassComponent from 'vue-class-component';
import getData from '../../getData';
import router from '../../router';

@vueClassComponent({
    name: 'Login',
})

export default class Login extends vue {
    public username: string = '';
    public password: string = '';

    public login() {
        getData.getLoginToken(this.username, this.password).then((loginResponse: any) => {
            localStorage.setItem('CityBeeToken', loginResponse.access_token);
            router.replace('/');
        });
    }
}
