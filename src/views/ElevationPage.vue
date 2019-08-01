<template>
  <div :class="[online ? 'online' : 'offline','elevation-page']">
    <Adsense
      ad-client="ca-pub-6102117487539042"
      ad-slot="6966721074" />
    <h1>
      <router-link :to="{name: 'home'}">
        {{ $t('site-title') }}
      </router-link>
    </h1>
    <ElevationReading />
    <SetLocation @share="share" />
    <Adsense
      ad-client="ca-pub-6102117487539042"
      ad-slot="1948746426" />
    <TheFooter/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
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
  data() {
    return {
      online: navigator.onLine,
    };
  },
  computed: {
    ...mapState(['elevation', 'location']),
    formattedTitle() {
      return parseUrlTitle(this.title);
    },
  },
  methods: {
    updateLocation() {
      console.log('updateLocation');
      document.title = `${this.$t('site-title')} • ${this.formattedTitle}`;
      this.$store.dispatch('updateLocation', {
        latitude: parseFloat(this.latitude),
        longitude: parseFloat(this.longitude),
        title: this.formattedTitle,
      });
      this.$store.dispatch('fetchElevation').then(() => {
        this.$store.dispatch('setLocationOpen', false);
      });
    },
    updateOnlineStatus() {
      this.online = navigator.onLine;
    },
    share() {
      this.$router.push({
        name: 'share',
        params: {
          latitude: `${this.location.latitude}`,
          longitude: `${this.location.longitude}`,
          title: this.title,
          elevation: `${this.elevation.value}`,
        },
      });
    },
  },
  created() {
    this.$store.dispatch('setUseFeet', this.$t('units.feet-default') === 'true');
    if (this.latitude && this.longitude) {
      this.updateLocation();
    } else {
      this.$store.dispatch('getUserLocation');
    }
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  },
  watch: {
    longitude() {
      this.updateLocation();
    },
  },
};
</script>
