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
                      <p class="subtitle is-6">{{ exampleProperty }}@johnsmith</p>
                    </div>
                  </div>

                  <div class="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris.
                    <a>@bulmaio</a>.
                    <a href="#">#css</a>
                    <a href="#">#responsive</a>
                    <br>
                    <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
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

