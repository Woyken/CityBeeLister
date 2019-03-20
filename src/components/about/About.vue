<template>
  <div>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
      integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
      crossorigin="anonymous"
    >
    <div class="container">
      <!-- START ARTICLE FEED -->
      <section class="articles">
        <div class="column is-8 is-offset-2">
          <!-- START ARTICLE -->
          <div class="card article">
            <div class="card-content">
              <div class="media">
                <div class="media-content has-text-centered">
                  <p class="title article-title">About</p>
                </div>
              </div>
              <div class="content article-body">
                <p>This website is NOT affiliated with CityBee</p>
                <p>This website was made as a fun side project. I'm not making any money of this.</p>

                <p>
                  This website is not intended to replace CityBee app or Trafi.
                  I'm not responsibe for any accidental vehicle reservations (planned feature) you might make.
                </p>
                <h3 class="has-text-centered">Transparency</h3>
                <p>None of your entered information is stored. All information you enter is sent directly to CityBee API and displayed back on this website.</p>
                <p>For anyone concerned, you can look at the source files here</p>
                <a
                  href="https://github.com/Woyken/CityBeeLister"
                  target="_blank"
                  class="button is-primary is-medium"
                >
                  <span class="icon">
                    <i class="fab fa-github"></i>
                  </span>
                  <span>Github</span>
                </a>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import vue from "vue";

export default vue.extend({
  name: "About"
});
</script>

