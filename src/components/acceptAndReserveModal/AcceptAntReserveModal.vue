<template>
  <div>
    <div ref="acceptReserveModal" v-bind:class="['modal', { 'is-active' : isActive }]">
      <div
        class="modal-background"
        v-on:click="isActive = false"
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
        v-on:click="isActive = false"
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
import { Prop } from 'vue-property-decorator';
import authorizationHelper from '../../authorizationHelper';

@vueClassComponent({
    name: 'AcceptAntReserveModal',
})
export default class AcceptAntReserveModal extends vue {
    @Prop({ default: undefined })
    public selectedCarDetails?: CarDetailedInfo;
    @Prop({ default: false })
    public isActive: boolean = false;

    private authorizationHelper = authorizationHelper;
}
</script>
