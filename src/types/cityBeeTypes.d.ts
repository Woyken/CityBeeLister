interface AvailableCar {
    id: number
    service_id: number
    lat: number
    long: number
    price: number
    is_electric: boolean
    is_cargo: boolean
    fuel_level: number
    address: string
}

type AvailableCars = AvailableCar[];

/*
id	65
service_id	14
lat	54.9166374
long	23.9472046
price	0.18
is_electric	false
is_cargo	false
fuel_level	24
address	Savanorių pr. 266
*/

interface CarDetails {
    id: number
    make: string
    model: string
    license_plate: string
    fuel_capacity: number
    image_uri: string
    image_2d_uri: string
    avg_fuel_consumption: number
    features: CarDetailsFeatures
    is_automatic: boolean
    service_id: number
}

interface CarDetailsFeatures {
    usb: boolean
    bluetooth: boolean
    child_seat: boolean
    navigation: boolean
    air_conditioning: boolean
}

type CarsDetails = CarDetails[];

/*
id	65
make	Ford
model	Fiesta
license_plate	KDT279
fuel_capacity	42
image_uri	https://citybeeproductionlt.blob.core.windows.net/images/8fb5f26f-5c46-4cc4-8155-99574060a6aa.png
image_2d_uri	https://citybeeproductionlt.blob.core.windows.net/images/8900e6c1-5330-462e-bd37-b0bc0fd82b44.png
avg_fuel_consumption	7
features	{…}
    usb	true
    bluetooth	true
    child_seat	true
    navigation	false
    air_conditioning	true
is_automatic	true
service_id	14
*/


interface LoginResponse {
    access_token: string,
    token_type: string,
    expires_in: number,
    refresh_token: string,
    username: string,
    roles: string,
    RegistrationState: string,
    Name: string,
    IsCompany: string,
    ".issued": string,
    ".expires": string,
}

// {
//     "access_token": "............",
//     "token_type": "bearer",
//     "expires_in": 3599,
//     "refresh_token": "32fda549-e2b4-4418-aa0e-1b2f4aab81bb",
//     "username": "karolis.uzkuraitis@gmail.com",
//     "roles": "User",
//     "RegistrationState": "Confirmed",
//     "Name": "KAROLIS",
//     "IsCompany": "false",
//     ".issued": "Tue, 19 Mar 2019 18:30:58 GMT",
//     ".expires": "Tue, 19 Mar 2019 19:30:58 GMT"
// }

