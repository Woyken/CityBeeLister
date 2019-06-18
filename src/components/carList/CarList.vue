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
              <div class="card">
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-128x128">
                        <img :src="carDetail.carDetails.image_uri" alt="Placeholder image">
                      </figure>
                    </div>
                    <div class="media-content">
                      <p
                        class="title is-4"
                      >{{ carDetail.carDetails.make }} {{ carDetail.carDetails.model }}</p>
                      <p class="subtitle is-8">{{ carDetail.carDetails.license_plate }}</p>
                    </div>
                  </div>

                  <div class="content">
                    Fuel: {{ (carDetail.carAvailable.fuel_level/carDetail.carDetails.fuel_capacity*100).toFixed(0) }}%
                    <br>
                    <p>Location: {{ carDetail.carAvailable.address }}</p>
                  </div>
                </div>
                <footer class="card-footer">
                  <a
                    href="#"
                    class="card-footer-item"
                    v-on:click="$refs.acceptReserveModal.classList.add('is-active'); selectedCarDetails = carDetail"
                  >Details</a>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div ref="acceptReserveModal" class="modal">
      <div
        class="modal-background"
        v-on:click="$refs.acceptReserveModal.classList.remove('is-active')"
      ></div>
      <div class="modal-content" v-if="selectedCarDetails">
        <div class="box">
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-128x128">
                    <img :src="selectedCarDetails.carDetails.image_uri" alt="Placeholder image">
                  </figure>
                </div>
                <div class="media-content">
                  <p
                    class="title is-4"
                  >{{ selectedCarDetails.carDetails.make }} {{ selectedCarDetails.carDetails.model }}</p>
                  <p class="subtitle is-8">{{ selectedCarDetails.carDetails.license_plate }}</p>
                </div>
              </div>

              <div class="content">
                Fuel: {{ (selectedCarDetails.carAvailable.fuel_level/selectedCarDetails.carDetails.fuel_capacity*100).toFixed(0) }}%
                <br>
                <p>Location: {{ selectedCarDetails.carAvailable.address }}</p>
                <p>
                  Avearage fuel consumption: {{ selectedCarDetails.carDetails.avg_fuel_consumption }}l/100km.
                  <br>
                  Current fuel amount: {{ selectedCarDetails.carAvailable.fuel_level }}l.
                  <br>
                  Could drive about: {{ (selectedCarDetails.carAvailable.fuel_level/selectedCarDetails.carDetails.avg_fuel_consumption*100).toFixed(0) }}km.
                </p>
                <p></p>
              </div>
            </div>
            <footer class="card-footer">
              <a
                v-if="authorizationHelper.isAuthorized"
                href="#"
                class="card-footer-item"
                v-on:click="$refs.acceptReserveModalApprove.classList.add('is-active');"
              >Reserve car</a>
            </footer>
          </div>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        v-on:click="$refs.acceptReserveModal.classList.remove('is-active');"
      ></button>
    </div>

    <div ref="acceptReserveModalApprove" class="modal">
      <div
        class="modal-background"
        v-on:click="$refs.acceptReserveModalApprove.classList.remove('is-active');"
      ></div>
      <div class="modal-content" v-if="selectedCarDetails">
        <div class="box">
          <article class="message is-danger">
            <div class="message-header">
              <p>Danger</p>
              <button
                class="delete"
                aria-label="delete"
                v-on:click="$refs.acceptReserveModalApprove.classList.remove('is-active');"
              ></button>
            </div>
            <div class="message-body">
              This action will
              <strong>actually start</strong> car reservation with your account! Are you sure you want to do this?
            </div>
            <footer class="card-footer">
              <a
                href="#"
                class="card-footer-item button is-danger"
                v-on:click="$refs.finalConfirmationReservation.classList.add('is-active');"
              >Reserve car</a>
              <a
                href="#"
                class="card-footer-item button is-primary"
                v-on:click="$refs.acceptReserveModalApprove.classList.remove('is-active');"
              >Cancel (Take me back to safety)</a>
            </footer>
          </article>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        v-on:click="$refs.acceptReserveModalApprove.classList.remove('is-active');"
      ></button>
    </div>

    <div ref="finalConfirmationReservation" class="modal">
      <div
        class="modal-background"
        v-on:click="$refs.finalConfirmationReservation.classList.remove('is-active'); $refs.acceptReserveModalApprove.classList.remove('is-active');"
      ></div>
      <div class="modal-content" v-if="selectedCarDetails">
        <div class="box">
          <article class="message is-large">
            <div class="message-header">
              <p>Danger</p>
              <button
                class="delete"
                aria-label="delete"
                v-on:click="$refs.finalConfirmationReservation.classList.remove('is-active'); $refs.acceptReserveModalApprove.classList.remove('is-active');"
              ></button>
            </div>
            <div
              class="message-body"
            >Before we do this, you have opened CityBee app, and are ready to cancel reservation, or make sure one is not pending before continuing?</div>
            <footer class="card-footer">
              <a
                href="#"
                class="card-footer-item button is-danger"
                v-on:click="reserveTheCar(selectedCarDetails.carAvailable.id)"
              >Yes! Let's do this!</a>
              <a
                href="#"
                class="card-footer-item button is-primary"
                v-on:click="$refs.finalConfirmationReservation.classList.remove('is-active'); $refs.acceptReserveModalApprove.classList.remove('is-active');"
              >Cancel (Take me back to safety)</a>
            </footer>
          </article>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        v-on:click="$refs.finalConfirmationReservation.classList.remove('is-active'); $refs.acceptReserveModalApprove.classList.remove('is-active');"
      ></button>
    </div>
  </div>
</template>

<script lang="ts">
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

