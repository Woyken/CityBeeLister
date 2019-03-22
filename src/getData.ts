import authorizationHelper from './authorizationHelper';
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

    public async getAvailableCars(): Promise<AvailableCars> {
        const response = await fetch(`${configuration.WEBAPP_URL}/api/CarsLive/GetAvailableCars`, {
            headers: {
                'App-Version': configuration.APP_VERSION,
            },
            method: 'GET',
        });
        return await response.json() as AvailableCars;
    }

    public async getCarsDetails(): Promise<CarsDetails> {
        if (this.carsDetailsCached) {
            return this.carsDetailsCached;
        }
        const response = await fetch(`${configuration.WEBAPP_URL}/api/CarsLive/GetCarsDetails`, {
            headers: {
                'App-Version': configuration.APP_VERSION,
            },
            method: 'GET',
        });

        this.carsDetailsCached = await response.json() as CarsDetails;
        return this.carsDetailsCached;
    }

    public async getCurrentReservation(retrying: boolean = false)
    : Promise<CityBeeReservationCurrentResponse> {
        const authToken: string = await authorizationHelper.getAuthorizationToken();

        const result = await fetch(`${configuration.WEBAPP_URL}/api/AssetReservation/GetCurrent`, {
            headers: {
                'App-Version': configuration.APP_VERSION,
                Authorization: `Bearer ${authToken}`,
            },
            method: 'GET',
        });
        switch (result.status) {
        case 401:
            // Unauthorized. Try updating token.
            if (!retrying) {
                await authorizationHelper.forceRefreshAuthorizationToken();
                return this.getCurrentReservation(true);
            }
            break;

        default:
            break;
        }
        return await result.json() as CityBeeReservationCurrentResponse;
    }

    public async startReservation(vehicleId: number, retrying: boolean = false)
    : Promise<CityBeeReservationInitializeResponse> {
        const authToken: string = await authorizationHelper.getAuthorizationToken();
        throw new Error('RESERVATION? not yet!.');

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
        switch (result.status) {
        case 401:
            // Unauthorized. Try updating token.
            if (!retrying) {
                await authorizationHelper.forceRefreshAuthorizationToken();
                return this.startReservation(vehicleId, true);
            }
            break;

        default:
            break;
        }
        return await result.json() as CityBeeReservationInitializeResponse;
    }

    public async stopReservation(reservationId: string, retrying: boolean = false)
    : Promise<CityBeeHistoricalReservationDetails> {
        const authToken: string = await authorizationHelper.getAuthorizationToken();
        throw new Error('RESERVATION? not yet!.');
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
        switch (result.status) {
        case 401:
            // Unauthorized. Try updating token.
            if (!retrying) {
                await authorizationHelper.forceRefreshAuthorizationToken();
                return this.stopReservation(reservationId, true);
            }
            break;

        default:
            break;
        }
        return await result.json() as CityBeeReservationStoppedResponse;
    }

    public async getFullMergedCarsDetails(): Promise<CarDetailedInfo[]> {
        const [carsAvailable, carsDetails] = await Promise.all([
            this.getAvailableCars(),
            this.getCarsDetails(),
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
