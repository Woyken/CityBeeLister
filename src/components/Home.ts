import Vue from "vue";
import Component from 'vue-class-component'
import { GetCityBeeData } from "../getData";
import { LocationHelper } from "../locationHelper";

@Component({
	name: "Home"
})

export default class Home extends Vue {
	carsDetailedInfo: CarDetailedInfo[] = [];
	myPosition: Position | null = null;
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

	async sortCarList() {
		if(this.myPosition) {
			new LocationHelper().sortByDistance(this.myPosition.coords, this.carsDetailedInfo);
		}
	}

	async updateMyLocation() {
		this.workStatus = "Waiting for location access to sort car list.";
		try {
			this.myPosition = await new LocationHelper().getCurrentLocation()
		} catch (error) {

		}
		this.sortCarList();
		this.workStatus = "";
	}

	async updateCarList() {
		const token = null;
		this.workStatus = "Getting car list...";
		this.carsDetailedInfo = await new GetCityBeeData().getFullMergedCarsDetails(token!);
		this.sortCarList();
		this.updateMyLocation();
	}
}
