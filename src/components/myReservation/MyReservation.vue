<template>
  <div>
    <div v-if="reservationStatus">
      <div class="subtitle has-text-danger" v-if="errorMessage">{{ errorMessage }}</div>
      <button class="button is-danger" v-on:click="stopReservation">Stop reservation</button>
      <p>
        fuel_level - {{ reservationStatus.fuel_level }}
        <br>
        id - {{ reservationStatus.id }}
        <br>
        asset_id - {{ reservationStatus.asset_id }}
        <br>
        trip_start_countdown - {{ reservationStatus.trip_start_countdown }}
        <br>
        trip_active_timer - {{ reservationStatus.trip_active_timer }}
        <br>
        reservation_status - {{ reservationStatus.reservation_status }}
        <br>
        make - {{ reservationStatus.make }}
        <br>
        model - {{ reservationStatus.model }}
        <br>
        number_plate - {{ reservationStatus.number_plate }}
        <br>
        picture - {{ reservationStatus.picture }}
        <br>
        price_time - {{ reservationStatus.price_time }}
        <br>
        price_distance - {{ reservationStatus.price_distance }}
        <br>
        price_total - {{ reservationStatus.price_total }}
        <br>
        lat - {{ reservationStatus.lat }}
        <br>
        long - {{ reservationStatus.long }}
        <br>
        is_electric - {{ reservationStatus.is_electric }}
        <br>
        is_cargo - {{ reservationStatus.is_cargo }}
        <br>
        asset_type - {{ reservationStatus.asset_type }}
        <br>
        start_address - {{ reservationStatus.start_address }}
      </p>
    </div>
    <div v-else>
      <p>No reservation is active.</p>
    </div>
  </div>
</template>

<script lang="ts">
import vue from 'vue';
import vueClassComponent from 'vue-class-component';
import authorizationHelper from '../../authorizationHelper';
import getData from '../../getData';
import router from '../../router';

@vueClassComponent({
    name: 'MyReservation',
    watch: {
        $route (to, from) {
            if (to.name !== from.name && to.path === '/reservation') {
                (this as MyReservation).startChecking();
            }
        },
    },
})
export default class MyReservation extends vue {
    private reservationStatus: CityBeeReservationCurrentResponse | null = null;
    private intervalChecker: number | null = null;
    private errorMessage: string | null = null;

    public async mounted() {
        // Start interval checking current status of reservation.
        this.startChecking();
    }

    public async startChecking() {
        this.errorMessage = null;
        if (!authorizationHelper.isAuthorized) {
            router.push('/login');
            return;
        }

        this.reservationStatus = await getData.getCurrentReservation();

        if (this.intervalChecker === null) {
            this.intervalChecker = window.setInterval(async () => {
                this.reservationStatus = await getData.getCurrentReservation();

            },                                        10000);
        }
    }

    public async stopReservation() {
        try {
            if (this.reservationStatus) {
                const stoppedReservationStatus =
                    await getData.stopReservation(this.reservationStatus.id);
            }
        } catch (error) {
// tslint:disable-next-line: max-line-length
            this.errorMessage = 'Something went wrong! Quickly now! Open your CityBee app and see what\'s happening!!!';
        }
    }
}
</script>
