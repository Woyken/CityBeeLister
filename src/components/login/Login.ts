import vue from 'vue';
import vueClassComponent from 'vue-class-component';
import authorizationHelper from '../../authorizationHelper';
import getData from '../../getData';
import router from '../../router';

@vueClassComponent({
    name: 'Login',
})

export default class Login extends vue {
    public username: string = '';
    public password: string = '';
    public errorMessage: string | null = null;

    public async login() {
        const success =
        await authorizationHelper.getNewAuthorizationTokenByUsername(this.username, this.password);
        if (!success) {
            this.errorMessage = 'Login has failed!';
            return;
        }

        router.replace('/');
    }
}
