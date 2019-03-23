import vue from 'vue';
import vueClassComponent from 'vue-class-component';
import authorizationHelper from '../../authorizationHelper';
import router from '../../router';

@vueClassComponent({
    name: 'Login',
})

export default class LoginComponent extends vue {
    public username: string = '';
    public password: string = '';
    public errorMessage: string | null = null;

    public async login() {
        let success = false;
        try {
            success = await authorizationHelper.getNewAuthorizationTokenByUsername(
                this.username, this.password);
        } catch (error) {
            this.errorMessage = error;
            return;
        }

        if (!success) {
            this.errorMessage = 'Login has failed!';
            return;
        }
        this.errorMessage = '';
        router.back();
    }
}
