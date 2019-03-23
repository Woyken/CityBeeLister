import getData from './getData';
import router from './router';

class AuthorizationHelper {
    private pLoginData: LoginResponse | null = null;

    public async getAuthorizationToken(): Promise<string> {
        if (!this.pLoginData) {
            router.push('/login');
            return Promise.reject('Login required.');
        }
        if (Date.parse(this.pLoginData['.expires']) <= Date.now()) {
            // Expired, try getting new one.
            await this.getNewAuthorizationTokenByRefreshToken(this.refreshToken);
        }
        return this.pLoginData.access_token;
    }

    public async getNewAuthorizationTokenByUsername(username: string, password: string) {
        this.pLoginData = await getData.getLoginToken(username, password);
        if (this.pLoginData) {
            return true;
        }
        return false;
    }

    public async getNewAuthorizationTokenByRefreshToken(refreshToken: string) {
        this.pLoginData = await getData.getLoginTokenByRefreshToken(refreshToken);
    }

    public get refreshToken(): string {
        if (!this.pLoginData) {
            router.replace('/login');
            return '';
        }
        return this.pLoginData.refresh_token;
    }

    public async forceRefreshAuthorizationToken(): Promise<string> {
        try {
            await this.getNewAuthorizationTokenByRefreshToken(this.refreshToken);
        } catch (error) {
            this.pLoginData = null;
            router.replace('/login');
            return Promise.reject('');
        }
        return this.getAuthorizationToken();
    }

    public get isAuthorized(): boolean {
        return !!this.pLoginData;
    }
}

const authorizationHelper = new AuthorizationHelper();

export default authorizationHelper;
