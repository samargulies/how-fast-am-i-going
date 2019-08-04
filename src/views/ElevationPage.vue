<template>
  <div :class="[online ? 'online' : 'offline','page page--elevation']">
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
    <p class="speech-bubble">
      <strong>New:</strong> Create a custom share image for Instagram or Facebook
    </p>
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
        query: {
          ref: 'share',
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
.share-action--image:before {
  content: "";
  mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 17 14' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.999 13.463c-1.483 0-2.256-.766-2.256-2.229V2.915C.743 1.445 1.516.687 3 .687h11.696c1.477 0 2.25.765 2.25 2.228v8.32c0 1.462-.773 2.228-2.25 2.228H3zM2.11 3.038v7.28l1.873-1.674c.28-.26.56-.383.875-.383.322 0 .643.13.93.39l1.258 1.141 3.09-2.762c.307-.28.642-.403 1.018-.403.37 0 .725.137 1.026.41l3.397 3.186V3.038c0-.663-.348-.991-.97-.991H3.08c-.629 0-.97.328-.97.991zm3.952 4.163c-.903 0-1.641-.738-1.641-1.647 0-.896.738-1.64 1.64-1.64.903 0 1.641.744 1.641 1.64 0 .909-.738 1.647-1.64 1.647z' fill='%23000' fill-rule='nonzero'/%3E%3C/svg%3E");
  background-color: #535353;
  mask-repeat: no-repeat;
  mask-size: contain;
  width: 1rem;
  height: 1rem;
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
  margin-right: 0.4rem;
}
.share-action--url {
  position: relative;
  &:before {
    content: "";
    mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.087 10.895c-.472-.096-.937-.37-1.34-.773-1.559-1.559-1.545-3.76-.007-5.29l2.94-2.94c1.538-1.538 3.732-1.552 5.29.013 1.552 1.552 1.546 3.746.008 5.284L11.975 9.2c.15-.601.088-1.23-.096-1.75l1.128-1.114c1.012-1.005 1.012-2.44-.007-3.466-1.012-1.012-2.447-1.012-3.459 0L6.718 5.692c-1.012 1.012-1.012 2.448 0 3.46.41.41.895.642 1.387.676a1.505 1.505 0 0 1-.26.315l-.758.752zm-5.353 3.24c-1.558-1.559-1.545-3.753 0-5.298l2.003-2.003a2.998 2.998 0 0 0 .09 1.743L2.704 9.698c-1.012 1.012-1.012 2.434.007 3.466 1.005 1.012 2.447 1.012 3.459 0l2.823-2.823c1.012-1.012 1.012-2.447 0-3.46-.417-.41-.902-.642-1.388-.676.048-.089.158-.212.247-.3l.772-.773c.465.102.93.369 1.333.78 1.559 1.55 1.552 3.752.007 5.29l-2.926 2.926c-1.552 1.552-3.746 1.565-5.305.007z' fill='%23000' fill-rule='nonzero'/%3E%3C/svg%3E");
    background-color: #535353;
    background-repeat: no-repeat;
    background-size: contain;
    width: 1rem;
    height: 1rem;
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
    margin-right: 0.4rem;
    margin-top: -0.225rem;
  }
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
    opacity: 0.8;
  }
}
.speech-bubble {
  position: relative;
  background: #ffefdd;
  border-radius: 0.4em;
  padding: 0.5em 1em;
  color: #444;
  strong {
    font-weight: 600;
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 41%;
    width: 0;
    height: 0;
    border: 0.7em solid transparent;
    border-bottom-color: #ffefdd;
    border-top: 0;
    margin-left: -0.7em;
    margin-top: -0.7em;
    @media (max-width: 25rem) {
      left: 30%;
    }
  }
}
</style>
