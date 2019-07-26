<template>
  <div class="main">
    <div class="section section--atlas">
      <h1 class="section__title">What is my elevation <span class="subpage">Atlas</span></h1>
      <div v-if="!allCities" class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
      <div v-for="(states, country) in allCities" :key="country" class="country">
        <h2 class="country__name">{{country}}</h2>
        <div class="states" v-if="includeStates(states)">
          <div class="state" v-for="(cities, state) in states" :key="state">
            <h3 class="state__name">{{state}}</h3>
            <div class="cities">
              <div v-for="(city, index) in cities" class="city"
                :key="`${country}-${state}-${index}`">
                  <router-link :to="{name: 'location', params: {
                      latitude: `${city.lat}`,
                      longitude: `${city.lng}`,
                      title: cityNameUrl({...city, state, country}),
                    }}">
                      {{city.city}}
                    </router-link>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="cities no-states">
          <div v-for="(cities, state) in states" :key="state" class="city">
            <div v-for="city in cities"
              :key="`${city.lat}${city.lng}`">
                <router-link :to="{name: 'location', params: {
                    latitude: `${city.lat}`,
                    longitude: `${city.lng}`,
                    title: cityNameUrl({...city, state, country}),
                  }}">
                    {{city.city}}
                </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheFooter/>
  </div>
</template>

<script>
import '@/assets/css/style.scss';
import TheFooter from '@/components/TheFooter.vue';
import { encodeUrlTitle } from '@/helpers';

export default {
  components: { TheFooter },
  data() {
    return {
      allCities: null,
    };
  },
  methods: {
    cityNameUrl(city) {
      return encodeUrlTitle(`${city.city}, ${city.state}, ${city.country}`);
    },
    includeStates(country) {
      const numStates = Object.keys(country).length;
      const numCities = Object.values(country).reduce((acc, state) => acc + state.length, 0);
      if (numStates < 10 || numCities < 50 || numStates * 8 > numCities) {
        return false;
      }
      return true;
    },
  },
  created() {
    import('@/data/cities.json').then((cities) => {
      this.allCities = cities.default;
    });
  },
};
</script>
