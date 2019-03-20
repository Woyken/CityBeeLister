<template>
  <div>
    <div class="columns">
      <div class="column">
        <h2 class="title">CityBees</h2>
        <p>Right, so this is a list of CityBees around.</p>
        <br>
        <p v-if="myPosition">Current coordinates: {{ myPosition.coords.latitude }}, {{ myPosition.coords.longitude }}</p>
        <p v-else>Your location is unknown, car list will not be sorted.</p>
        <button
          class="button is-block is-info is-medium"
          v-on:click="updateMyLocation"
        >Refresh location</button>
        <button
          class="button is-block is-primary is-medium"
          v-on:click="updateCarList"
        >Refresh the list</button>
      </div>
      <div class="column is-10">
        <h1 class="title">The list</h1>
        <p class="subtitle">{{ workStatus }}</p>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import HomePage from "./Home";
export default HomePage;
</script>

