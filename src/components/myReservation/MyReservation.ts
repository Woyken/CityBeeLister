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
