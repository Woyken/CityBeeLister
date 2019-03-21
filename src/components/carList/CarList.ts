import vue from 'vue';
import vueClassComponent from 'vue-class-component';
import getData from '../../getData';
import { LocationHelper } from '../../locationHelper';

enum TasksOngoing {
    FetchingCarDetails,
    FindingLocation,
}

@vueClassComponent({
    name: 'CarList',
})

export default class CarList extends vue {
    public carsDetailedInfo: CarDetailedInfo[] = [];
    public myPosition: Position | null = null;
    public tasksAsString: string = '';
    public tasksOngoing: Set<TasksOngoing> = new Set();
    public filterByLPN: string = '';

    constructor() {
        super();
    }

    public async created() {
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
        this.tasksOngoing.add(TasksOngoing.FindingLocation);
        this.updateTasksString();
        try {
            this.myPosition = await new LocationHelper().getCurrentLocation();
            this.sortCarList();
        } catch (error) {
            // do nothing if this fails.
        }
        this.tasksOngoing.delete(TasksOngoing.FindingLocation);
        this.updateTasksString();
    }

    public async updateCarList() {
        this.updateMyLocation();
        this.tasksOngoing.add(TasksOngoing.FetchingCarDetails);
        this.updateTasksString();
        const token = null;
        this.carsDetailedInfo = await getData.getFullMergedCarsDetails(token!);
        this.filterCarListByLPN();
        this.sortCarList();
        this.tasksOngoing.delete(TasksOngoing.FetchingCarDetails);
        this.updateTasksString();
    }

    public async filterCarListByLPN() {
        const filterByLicensePlates = this.filterByLPN.split(',');

        if (filterByLicensePlates.length <= 0 || !this.filterByLPN) {
            return;
        }

        this.carsDetailedInfo = this.carsDetailedInfo.filter((carDetailedInfo) => {
            return filterByLicensePlates.findIndex((plate) => plate === carDetailedInfo.carDetails.license_plate) >= 0;
        })
    }

    public updateTasksString(): void {
        if (this.tasksOngoing.size <= 0) {
            this.tasksAsString = '';
            return;
        }
        const taskNames: string[] = [];
        this.tasksOngoing.forEach((task) => {
            switch (task) {
            case TasksOngoing.FetchingCarDetails:
                taskNames.push('Fetching car details');
                break;
            case TasksOngoing.FindingLocation:
                taskNames.push('Trying to access location.');
                break;
            default:
                break;
            }
        });
        this.tasksAsString = `Working on: ${taskNames.join(', ')}`;
    }
}
