import configuration from './configuration';

export class GetCityBeeData {
    public carsDetailsCached!: CarsDetails;

    public getLoginToken(username: string, password: string): Promise<LoginResponse> {
        const response = fetch(`${configuration.AUTHORIZATION_URL}/token`, {
            body: `grant_type=password&username=${escape(username)}&password=${escape(password)}`,
            headers: {
                'App-Version': configuration.APP_VERSION,
            },
            method: 'POST',
        });
        return response.then((result: any) => {
            return new Promise<LoginResponse>((resolve, reject) => {
                resolve(result.json() as LoginResponse);
            });
        });
    }

    public getAvailableCars(authToken: string): Promise<AvailableCars> {
        const response = fetch(`${configuration.WEBAPP_URL}/api/CarsLive/GetAvailableCars`, {
            headers: {
                'App-Version': configuration.APP_VERSION,
                Authorization: `Bearer ${authToken}`,
            },
            method: 'GET',
        });
        return response.then((result: any) => {
            return new Promise<AvailableCars>((resolve, reject) => {
                resolve(result.json() as AvailableCars);
            });
        });
    }

    public getCarsDetails(authToken: string): Promise<CarsDetails> {
        if (this.carsDetailsCached) {
            return Promise.resolve(this.carsDetailsCached);
        }
        const response = fetch(`${configuration.WEBAPP_URL}/api/CarsLive/GetCarsDetails`, {
            headers: {
                'App-Version': configuration.APP_VERSION,
                Authorization: `Bearer ${authToken}`,
            },
            method: 'GET',
        });
        return response.then((result: any) => {
            return new Promise<CarsDetails>((resolve, reject) => {
                this.carsDetailsCached = result.json() as CarsDetails;
                resolve(this.carsDetailsCached);
            });
        });
    }

    public async getFullMergedCarsDetails(authToken: string): Promise<CarDetailedInfo[]> {
        const [carsAvailable, carsDetails] = await Promise.all([
            this.getAvailableCars(authToken),
            this.getCarsDetails(authToken),
        ]);
        const carsDetailedInfo: CarDetailedInfo[] = [];
        carsAvailable.forEach((carAvail) => {
            carsDetails.forEach((carDetails) => {
                if (carAvail.id === carDetails.id) {
                    carsDetailedInfo.push({ carDetails, carAvailable: carAvail });
                }
            });
        });
        return carsDetailedInfo;
    }
}
