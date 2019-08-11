<template>
  <div :class="[online ? 'online' : 'offline','page page--elevation']">
    <Adsense
      class="ad--top"
      ad-client="ca-pub-6102117487539042"
      ad-slot="6966721074" />
    <h1>
      <router-link :to="pathForLocale({path: '/'})">
        {{ $t('site-title') }}
      </router-link>
    </h1>
    <ElevationReading />
    <SetLocation />
    <Adsense
      class="ad--bottom"
      ad-client="ca-pub-6102117487539042"
      ad-slot="1948746426" />
    <ShareActions />
    <TheFooter/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { parseUrlTitle, pathForLocale } from '@/helpers';
import ElevationReading from '@/components/ElevationReading.vue';
import SetLocation from '@/components/SetLocation.vue';
import Adsense from '@/components/Adsense.vue';
import ShareActions from '@/components/ShareActions.vue';
import TheFooter from '@/components/TheFooter.vue';


export default {
  components: {
    ElevationReading,
    SetLocation,
    Adsense,
    TheFooter,
    ShareActions,
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
  metaInfo() {
    return {
      title: this.formattedTitle,
      meta: [
        { property: 'og:image', content: this.imageUrl },
      ],
    };
  },
  computed: {
    ...mapState(['elevation', 'location']),
    formattedTitle() {
      return parseUrlTitle(this.title);
    },
    imageUrl() {
      if (!this.$route.query.id) {
        return null;
      }
      const bucket = process.env.VUE_APP_AWS_BUCKET;
      return `https://${bucket}.s3.amazonaws.com/${this.$route.query.id}.png`;
    },
  },
  methods: {
    updateLocation() {
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
    pathForLocale,
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
