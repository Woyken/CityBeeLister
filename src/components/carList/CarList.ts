import vue from 'vue';
import vueClassComponent from 'vue-class-component';
import authorizationHelper from '../../authorizationHelper';
import getData from '../../getData';
import { LocationHelper } from '../../locationHelper';
import router from '../../router';

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
    public selectedCarDetails: CarDetailedInfo | null = null;
    private authorizationHelper = authorizationHelper;

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
        this.carsDetailedInfo = await getData.getFullMergedCarsDetails();
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
            return filterByLicensePlates.findIndex((plate) => {
                return plate === carDetailedInfo.carDetails.license_plate;
            },
            ) >= 0;
        });
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

    public async reserveTheCar(carId: number) {
        (this.$refs.finalConfirmationReservation as Element).classList.remove('is-active');
        (this.$refs.acceptReserveModalApprove as Element).classList.remove('is-active');
        // TODO: Check if car still available;
        try {
            await getData.startReservation(carId);
            router.push('/reservation');
        } catch (error) {
            // Error occured. Either user is not yet logged in or reservation failed.
            console.log(error);
            // TODO: close modals.
        }
    }
}
