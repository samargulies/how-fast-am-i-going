<template>
  <div class="main">
    <div class="section section--atlas">
      <h1 class="section__title">What is my elevation: API</h1>

        <div class="section section--about">
          <h2 class="section__title">Global Elevation data for a fraction of the price</h2>
          <p>
            This site was designed to help you find the elevation of your current location, or any point on Earth.
            When viewed from a phone that supports elevation readings,
            the reading will come directly from your device altitude reading and will update
            automatically as you move. It will even work when your phone is offline.
            From a computer your elevation is loaded from our API based on your location.
          </p>
        </div>
    </div>
    <TheFooter/>
  </div>
</template>

<script>
import '@/assets/css/style.scss';
import TheFooter from '@/components/TheFooter.vue';

export default {
  components: { TheFooter },
};
</script>
