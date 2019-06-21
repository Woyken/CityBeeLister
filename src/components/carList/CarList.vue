<template>
  <div>
    <div class="columns">
      <div class="column">
        <h2 class="title">CityBees</h2>
        <p>Here is shown list of CityBees around you. If location access provided, list will be sorted by distance to you</p>
        <br>
        <p
          v-if="myPosition"
        >Current coordinates: {{ myPosition.coords.latitude }}, {{ myPosition.coords.longitude }}</p>
        <p v-else>Your location is unknown, car list will not be sorted.</p>
        <button
          class="button is-block is-info is-medium"
          v-on:click="updateMyLocation"
        >Refresh location</button>
        <button
          class="button is-block is-primary is-medium"
          v-on:click="updateCarList"
        >Refresh the list</button>
        <div class="field">
          <label class="label">Filterw cars by License plate number</label>
          <div class="control">
            <textarea
              class="textarea"
              placeholder="ABC123,GHJ456"
              v-model="filterByLPN"
              @change="filterCarListByLPN"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="column is-10">
        <h1 class="title">The list</h1>
        <p class="subtitle">{{ tasksAsString }}</p>
        <div class="columns">
          <div class="column">
            <div v-for="carDetail in carsDetailedInfo" :key="carDetail.carAvailable.id">
              <CarListItemVue v-bind:carDetail="carDetail" @openDetails="onOpenCarDetails"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AcceptAntReserveModalVue :selectedCarDetails="selectedCarDetails" @onClose="selectedCarDetails = undefined"/>
  </div>
</template>

<script lang="ts">
import vue from 'vue';
import vueClassComponent from 'vue-class-component';
import authorizationHelper from '../../authorizationHelper';
import getData from '../../getData';
import { LocationHelper } from '../../locationHelper';
import router from '../../router';
import AcceptAntReserveModalVue from '../acceptAndReserveModal/AcceptAntReserveModal.vue';
import CarListItemVue from '../carListItem/CarListItem.vue';

enum TasksOngoing {
    FetchingCarDetails,
    FindingLocation,
}
@vueClassComponent({
    components: {
        AcceptAntReserveModalVue,
        CarListItemVue,
    },
    name: 'CarList',
})
export default class CarList extends vue {
    public carsDetailedInfo: CarDetailedInfo[] = [];
    public myPosition: Position | null = null;
    public tasksAsString: string = '';
    public tasksOngoing: Set<TasksOngoing> = new Set();
    public filterByLPN: string = '';
    public selectedCarDetails?: CarDetailedInfo;
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

    public async onOpenCarDetails(selectedCarDetails: CarDetailedInfo) {
        this.selectedCarDetails = selectedCarDetails;
    }

    public async sortCarList() {
        if (this.myPosition) {
            new LocationHelper().sortByDistance(
                this.myPosition.coords,
                this.carsDetailedInfo,
            );
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

        this.carsDetailedInfo = this.carsDetailedInfo.filter(
            (carDetailedInfo) => {
                return (
                    filterByLicensePlates.findIndex((plate) => {
                        return (
                            plate === carDetailedInfo.carDetails.license_plate
                        );
                    }) >= 0
                );
            },
        );
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
        (this.$refs.finalConfirmationReservation as Element).classList.remove(
            'is-active',
        );
        (this.$refs.acceptReserveModalApprove as Element).classList.remove(
            'is-active',
        );
        // TODO: Check if car still available;
        try {
            await getData.startReservation(carId);
            router.push('/reservation');
        } catch (error) {
            // Error occured. Either user is not yet logged in or reservation failed.
            // tslint:disable-next-line: no-console
            console.log(error);
            // TODO: close modals.
        }
    }
}
</script>

