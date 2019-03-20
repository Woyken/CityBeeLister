import Vue from "vue";
import Component from 'vue-class-component'
import { GetCityBeeData } from "../getData";
import { LocationHelper } from "../locationHelper";

@Component({
	name: "Home"
})

export default class Home extends Vue {
	carsDetailedInfo: CarDetailedInfo[] = [];
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
			new LocationHelper().sortByDistance(pos.coords, this.carsDetailedInfo);
			this.workStatus = "";
		})
	}

	async updateCarList() {
		const token = null;
		this.workStatus = "Getting car list...";
		this.carsDetailedInfo = await new GetCityBeeData().getFullMergedCarsDetails(token!);
		this.updateMyLocation();
	}
}
