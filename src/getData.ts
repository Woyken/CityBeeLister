export class GetCityBeeData {
    constructor() {
    }

    public getLoginToken(username: string, password: string): Promise<LoginResponse> {
        const response = fetch("https://citybee-authorize-production-lt.azurewebsites.net/token", {
            method: "POST",
            headers: {
                "App-Version": "9.9.9"
            },
            body: `grant_type=password&username=${escape(username)}&password=${escape(password)}`
        });
        return response.then((result: any) => {
            return new Promise<LoginResponse>((resolve, reject) => {
                resolve(result.json() as LoginResponse)
            })
        })
    }

    public getAvailableCars(authToken: string): Promise<AvailableCars> {
        const response = fetch("https://citybee-webapp-production-lt.azurewebsites.net/api/CarsLive/GetAvailableCars", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${authToken}`,
                "App-Version": "9.9.9"
            },
        });
        return response.then((result: any) => {
            return new Promise<AvailableCars>((resolve, reject) => {
                resolve(result.json() as AvailableCars)
            })
        })
    }

    public getCarsDetails(authToken: string): Promise<CarsDetails> {
        const response = fetch("https://citybee-webapp-production-lt.azurewebsites.net/api/CarsLive/GetCarsDetails", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${authToken}`,
                "App-Version": "9.9.9"
            },
        });
        return response.then((result: any) => {
            return new Promise<CarsDetails>((resolve, reject) => {
                resolve(result.json() as CarsDetails)
            })
        })
    }

    public async getFullMergedCarsDetails(authToken: string): Promise<CarDetailedInfo[]> {
        const [carsAvailable, carsDetails] = await Promise.all([
            this.getAvailableCars(authToken),
            this.getCarsDetails(authToken)
        ]);
        const carsDetailedInfo: CarDetailedInfo[] = [];
        carsAvailable.forEach(carAvail => {
            carsDetails.forEach(carDetails => {
                if (carAvail.id === carDetails.id) {
                    carsDetailedInfo.push({ carAvailable: carAvail, carDetails: carDetails });
                }
            });
        });
        return carsDetailedInfo;
    }
}
