<template>
  <div>
    <div class="columns">
      <div class="column">
        <h2 class="title">CityBees</h2>
        <p>Right, so this is a list of CityBees, there's not much you can do from here.</p>
      </div>
      <div class="column is-10">
        <h1 class="title">The list</h1>
        <div class="columns">
          <div class="column">
            <div v-for="carDetail in carDetailedInfo" :key="carDetail.carAvailable.id">
              <div class="card">
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img :src="carDetail.carDetails.image_uri" alt="Placeholder image">
                      </figure>
                    </div>
                    <div class="media-content">
                      <p class="title is-4">{{ carDetail.carDetails.make }}</p>
                      <p class="subtitle is-6">{{ carDetail.carDetails.model }}</p>
                      <p class="subtitle is-6">{{ carDetail.carDetails.license_plate }}</p>
                    </div>
                  </div>

                  <div class="content">
                    Fuel: {{ carDetail.carDetails.fuel_capacity }}%
                    <br>
                    <p>Current location: {{ carDetail.carAvailable.address }}</p>
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

