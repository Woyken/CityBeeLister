<template>
  <div>
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-128x128">
              <img :src="carDetail.carDetails.image_uri" alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{ carDetail.carDetails.make }} {{ carDetail.carDetails.model }}</p>
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
          v-on:click="openDetailsModal()"
        >Details</a>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import vue from 'vue';
import vueClassComponent from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@vueClassComponent({
    name: 'CarListItem',
})
export default class CarListItem extends vue {
    @Prop({ default: undefined })
    public carDetail?: CarDetailedInfo;

    public openDetailsModal() {
        this.$emit('openDetails', this.carDetail);
    }
}
</script>
