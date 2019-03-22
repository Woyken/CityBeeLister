import configuration from './configuration';

class GetCityBeeData {
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
            return Promise.resolve(result.json() as LoginResponse);
        });
    }

    public getLoginTokenByRefreshToken(refreshToken: string): Promise<LoginResponse> {
        const response = fetch(`${configuration.AUTHORIZATION_URL}/token`, {
            body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
            headers: {
                'App-Version': configuration.APP_VERSION,
            },
            method: 'POST',
        });
        return response.then((result: any) => {
            return Promise.resolve(result.json() as LoginResponse);
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
            return Promise.resolve(result.json() as AvailableCars);
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
            this.carsDetailsCached = result.json() as CarsDetails;
            return Promise.resolve(this.carsDetailsCached);
        });
    }

    public async getCurrentReservation(authToken: string)
    : Promise<CityBeeReservationCurrentResponse> {
        const result = await fetch(`${configuration.WEBAPP_URL}/api/AssetReservation/GetCurrent`, {
            headers: {
                'App-Version': configuration.APP_VERSION,
                Authorization: `Bearer ${authToken}`,
            },
            method: 'GET',
        });
        return await result.json() as CityBeeReservationCurrentResponse;
    }

    public async startReservation(authToken: string, vehicleId: number)
    : Promise<CityBeeReservationInitializeResponse> {
        const bodyDataJson: CityBeeReservationInitializeBody = {
            AssetId: vehicleId,
            ReservationType: 0,
            Software: '0',
            StartType: 0,
        };
        const result = await fetch(`${configuration.WEBAPP_URL}/api/AssetReservation/Initialize`, {
            body: JSON.stringify(bodyDataJson),
            headers: {
                'App-Version': configuration.APP_VERSION,
                Authorization: `Bearer ${authToken}`,
            },
            method: 'POST',
        });
        return await result.json() as CityBeeReservationInitializeResponse;
    }

    public async stopReservation(authToken: string, reservationId: string)
    : Promise<CityBeeHistoricalReservationDetails> {
        const bodyData: CityBeeReservationStopBody = null;
        const result =
        await fetch(`${configuration.WEBAPP_URL}/api/AssetReservation/Stop/${reservationId}`, {
            body: bodyData,
            headers: {
                'App-Version': configuration.APP_VERSION,
                Authorization: `Bearer ${authToken}`,
            },
            method: 'POST',
        });
        return await result.json() as CityBeeReservationStoppedResponse;
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

const getCityBeeData = new GetCityBeeData();

export default getCityBeeData;
