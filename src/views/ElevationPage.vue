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
    <SetLocation />
    <div class="share-actions">
      <a class="share-action share-action--image" @click="shareImage">Share Image</a>
      <a :class="['share-action', 'share-action--url', shared ? 'shared' : '']"
        @click="shareLink"
        data-copy-text="Copied!">Share Link</a>
    </div>
    <Adsense
      ad-client="ca-pub-6102117487539042"
      ad-slot="1948746426" />
    <TheFooter/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { parseUrlTitle, round } from '@/helpers';
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
      shared: false,
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
    shareImage() {
      this.$router.push({
        name: 'ShareCustomizer',
        params: {
          latitude: `${round(this.location.latitude, 5)}`,
          longitude: `${round(this.location.longitude, 5)}`,
          title: this.title,
          elevation: `${this.elevation.value}`,
        },
      });
    },
    shareLink() {
      const route = this.$router.resolve({
        name: 'location',
        params: {
          latitude: `${round(this.location.latitude, 5)}`,
          longitude: `${round(this.location.longitude, 5)}`,
          title: this.title,
        },
      });
      const link = window.location.origin + route.href;
      if (typeof navigator.share === 'undefined') {
        navigator.clipboard.writeText(link);
        this.shared = true;
        setTimeout(() => { this.shared = false; }, 1000);
        return;
      }
      navigator.share({
        url: link,
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
<style lang="scss">
.share-action--url {
  position: relative;
  &:after {
    content: attr(data-copy-text);
    font-weight: 400;
    position: absolute;
    top: 1.5em;
    left: 0;
    width: 100%;
    transition: opacity 1s ease;
    opacity: 0;
    background: white;
    border-radius: 8px;
    color: #333;
    &:hover, &:focus {
      color: #333;
    }
  }
  &.shared:after {
    opacity: 1;
  }
}
</style>
