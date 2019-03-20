import Vue from "vue";
import Component from 'vue-class-component'
import { GetCityBeeData } from "../getData";
import { LocationHelper } from "../locationHelper";

@Component({
	name: "Home"
})

export default class Home extends Vue {
	carsDetails: CarsDetails = [];
	carsAvailable: AvailableCars = [];
	carDetailedInfo: CarDetailedInfo[] = [];
	myCoordsLat: number = 0;
	myCoordsLong: number = 0;
	workStatus: string = "Starting...";

	constructor() {
		super();
	}

	mounted() {
		// const token = localStorage.getItem("CityBeeToken");
		// if (token === "" || token === undefined) {
		// 	router.replace("/login");
		// }
		this.updateCarList();
	}

	updateMyLocation() {
		this.workStatus = "List is unsorted. Waiting for location access to sort car list.";
		new LocationHelper().getCurrentLocation().then((pos) => {
			this.myCoordsLat = pos.coords.latitude;
			this.myCoordsLong = pos.coords.longitude;
			new LocationHelper().sortByDistance(pos.coords, this.carDetailedInfo);
			this.workStatus = "";
		})
	}

	updateCarList() {
		const token = null;
		this.workStatus = "Getting car list...";
		new GetCityBeeData().getAvailableCars(token!).then((cars) => {
			this.carsAvailable = cars;
			new GetCityBeeData().getCarsDetails(token!).then((cars) => {
				this.carsDetails = cars;
				this.carDetailedInfo = [];
				this.carsAvailable.forEach(carAvail => {
					this.carsDetails.forEach(carDetails => {
						if (carAvail.id === carDetails.id) {
							this.carDetailedInfo.push({ carAvailable: carAvail, carDetails: carDetails });
						}
					});
				});

				this.updateMyLocation();
			});
		});
	}
}
