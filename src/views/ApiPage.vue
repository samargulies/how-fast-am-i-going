<template>
  <div class="main page--api">
    <div class="section">
      <h1 class="section__title">What is my elevation <span class="subpage">API</span></h1>

        <div class="section section--api-intro">
          <img src="/img/globe.svg" />
          <h2 class="section__title">Global elevation data for a fraction of the price</h2>
          <div class="text-block">
            <p>As our traffic grew, we struggled to find a reliable source of global elevation data that fit within our budget. Our API now handles millions of elevation requests per month, and costs less than 1/10th what you would pay to Google.</p>
            <p>Introducing the What is my elevation API.</p>
          </div>
          <a class="button" href="mailto:contact@whatismyelevation.com">Get in Touch</a>
        </div>

        <div class="section section--features">
          <div class="feature">
            <h3 class="feature__title">Affordable</h3>
            <img class="feature__image" src="/img/coin-stack.svg" />
            <p class="feature__description">Built with budget in mind, our elevation API can handle millions of requests without breaking the bank.</p>
          </div>
          <div class="feature">
            <h3 class="feature__title">Accurate</h3>
            <img class="feature__image" src="/img/magnifying-glass.svg" />
            <p class="feature__description">Aggregated from several open data providers, we offer <strong>30 meter global coverage</strong>, with up to 3 meter detail in the US and where data exists.</p>
          </div>
          <div class="feature">
            <h3 class="feature__title">Scalable</h3>
            <img class="feature__image" src="/img/chart.svg" />
            <p class="feature__description">Built with budget in mind, our elevation API can handle millions of requests without breaking the bank.</p>
        </div>
        <div class="feature">
          <h3 class="feature__title">Simple</h3>
          <img class="feature__image" src="/img/browser-pin.svg" />
          <p class="feature__description">Built with budget in mind, our elevation API can handle millions of requests without breaking the bank.</p>
        </div>
      </div>
    </div>
    <TheFooter :includeAbout="false" />
  </div>
</template>

<script>
import '@/assets/css/style.scss';
import TheFooter from '@/components/TheFooter.vue';

export default {
  components: { TheFooter },
};
</script>
