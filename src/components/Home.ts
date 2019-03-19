import Vue from "vue";
import Component from 'vue-class-component'
import router from "../router";
import { Prop } from 'vue-property-decorator'
import { GetCityBeeData } from "../getData";

interface CarDetailedInfo {
	carDetails: CarDetails;
	carAvailable: AvailableCar;
}

@Component({
	name: "Home"
})

export default class Home extends Vue {
	carsDetails: CarsDetails = [];
	carsAvailable: AvailableCars = [];
	carDetailedInfo: CarDetailedInfo[] = [];

	constructor() {
		super();
	}

	mounted() {
		const token = localStorage.getItem("CityBeeToken");
		if (token === "" || token === undefined) {
			router.replace("/login");
		}
		new GetCityBeeData().getAvailableCars(token!).then((cars) => {
			this.carsAvailable = cars

			new GetCityBeeData().getCarsDetails(token!).then((cars) => {
				this.carsDetails = cars;

				this.carsAvailable.forEach(carAvail => {
					this.carsDetails.forEach(carDetails => {
						if (carAvail.id === carDetails.id) {
							this.carDetailedInfo.push({ carAvailable: carAvail, carDetails: carDetails });
						}
					});
				});
			});
		});
	}
}
