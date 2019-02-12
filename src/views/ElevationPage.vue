<template>
  <div class="elevation-page">
    <div class="ad">
        <Adsense
        ad-client="ca-pub-6102117487539042"
        ad-slot="6966721074" />
    </div>
    <h1>{{ $t('site-title') }}</h1>
    <ElevationReading />
    <SetLocation />
    <TheFooter/>
  </div>
</template>

<script>
import { parseUrlTitle } from '@/helpers';
import ElevationReading from '@/components/ElevationReading.vue';
import SetLocation from '@/components/SetLocation.vue';
import Adsense from '@/components/Adsense.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  components: {
    ElevationReading,
    SetLocation,
    Adsense,
    TheFooter,
  },
  props: {
    title: { type: String },
    latitude: { type: String },
    longitude: { type: String },
  },
  methods: {
    getLocation() {
      navigator.geolocation.getCurrentPosition(
        this.setLocation,
        this.locationError,
        { enableHighAccuracy: true },
      );
    },
    setLocation(location) {
      console.log({ location });
      this.$store.dispatch('updateLocation', {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy,
      });
      if (location.coords.altitude) {
        this.$store.dispatch('updateElevation', {
          elevation: location.coords.altitude,
          source: 'phone',
        });
      } else {
        this.$store.dispatch('fetchElevation');
      }
    },
    updateLocation() {
      console.log('updateLocation');
      const title = parseUrlTitle(this.title);
      document.title = `${this.$t('site-title')} • ${title}`;
      this.$store.dispatch('updateLocation', {
        latitude: parseFloat(this.latitude),
        longitude: parseFloat(this.longitude),
        title,
      });
      this.$store.dispatch('fetchElevation');
    },
    locationError(error) {
      console.warn('location access denied', error);
      this.$store.commit('setItem', { item: 'loading', value: false });
      this.$store.dispatch('setLocationOpen', true);
    },
  },
  created() {
    this.$store.dispatch('setUseFeet', this.$t('units.feet-default') === 'true');
    if (this.latitude && this.longitude) {
      this.updateLocation();
    } else {
      this.getLocation();
    }
  },
  watch: {
    longitude() {
      this.updateLocation();
    },
  },
};
</script>
