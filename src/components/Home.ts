import vue from 'vue';
import vueClassComponent from 'vue-class-component';
import getData from '../getData';
import { LocationHelper } from '../locationHelper';

@vueClassComponent({
    name: 'Home',
})

export default class Home extends vue {
    public carsDetailedInfo: CarDetailedInfo[] = [];
    public myPosition: Position | null = null;
    public workStatus: string = 'Starting...';

    constructor() {
        super();
    }

    public async mounted() {
        // const token = localStorage.getItem("CityBeeToken");
        // if (token === "" || token === undefined) {
        // 	router.replace("/login");
        // }
        this.updateCarList();
        this.updateMyLocation();
    }

    public async sortCarList() {
        if (this.myPosition) {
            new LocationHelper().sortByDistance(this.myPosition.coords, this.carsDetailedInfo);
        }
    }

    public async updateMyLocation() {
        this.workStatus = 'Waiting for location access to sort car list.';
        try {
            this.myPosition = await new LocationHelper().getCurrentLocation();
            this.sortCarList();
        } catch (error) {
            // do nothing if this fails.
        }
        this.workStatus = '';
    }

    public async updateCarList() {
        const token = null;
        this.workStatus = 'Getting car list...';
        this.carsDetailedInfo = await getData.getFullMergedCarsDetails(token!);
        this.sortCarList();
        this.updateMyLocation();
    }
}
