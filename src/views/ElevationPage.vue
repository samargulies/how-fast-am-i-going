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
  },
  created() {
    this.$store.dispatch('setUseFeet', this.$t('units.feet-default') === 'true');
    if (this.latitude && this.longitude) {
      this.updateLocation();
    } else {
      this.$store.dispatch('getUserLocation');
    }
  },
  watch: {
    longitude() {
      this.updateLocation();
    },
  },
};
</script>
