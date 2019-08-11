<template>
  <div class="sharing">
    <div :class="['sharing__button', hasElevationValue ? 'active' : '']">
      <a class="share-button share-button--image"
        @click="shareImage">{{ $t('share-image') }}</a>
      <a :class="['share-button', 'share-button--url', shared ? 'shared' : '']"
        @click="shareLink"
        data-copy-text="Copied!">{{ $t('share-link') }}</a>
      <a class="share-button share-button--facebook" @click="shareToFacebook">
          {{ $t('facebook') }}</a>
     <a class="share-button share-button--twitter" @click="shareToTwitter">
          {{ $t('twitter') }}</a>
    </div>
   <transition name="fadeDown">
      <p class="sharing__promo"
        v-if="hasElevationValue"
        v-html="$t('share-promo')"></p>
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { round, sendEvent, encodeUrlTitle } from '@/helpers';

export default {
  data() {
    return {
      shared: false,
    };
  },
  computed: {
    ...mapState(['useFeet', 'elevation', 'loading', 'location']),
    hasElevationValue() {
      return Number.isFinite(this.elevation.value);
    },
    elevationFormatted() {
      const formatted = this.$options.filters.numberFormatted(this.elevation.value, {
        useFeet: this.useFeet,
        locale: this.$i18n.locale,
      });
      const units = this.$t(this.useFeet ? 'units.feet' : 'units.meters');
      return `${formatted} ${units}`;
    },
    shareText() {
      return `${this.$t('site-title')} ${this.elevationFormatted}`;
    },
  },
  methods: {
    shareImage() {
      if (!this.hasElevationValue) { return; }
      this.$router.push({
        name: 'ShareCustomizer',
        params: {
          latitude: `${round(this.location.latitude, 5)}`,
          longitude: `${round(this.location.longitude, 5)}`,
          title: encodeUrlTitle(this.location.title),
          elevation: `${round(this.elevation.value, 1)}`,
          lang: this.$i18n.locale,
        },
      });
    },
    getShareUrl({ encode } = { encode: true }) {
      const route = this.$router.resolve({
        name: 'location',
        params: {
          latitude: `${round(this.location.latitude, 5)}`,
          longitude: `${round(this.location.longitude, 5)}`,
          title: encodeUrlTitle(this.location.title),
          lang: this.$i18n.locale,
        },
        query: {
          ref: 'share',
        },
      });
      const url = window.location.origin + route.href;
      return encode ? encodeURIComponent(url) : url;
    },
    shareLink() {
      if (!this.hasElevationValue) { return; }
      sendEvent('share', 'link');
      const link = this.getShareUrl({ encode: false });
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
    async shareToFacebook() {
      sendEvent('share', 'facebook');
      const url = this.getShareUrl();
      window.open(`https://www.facebook.com/sharer.php?u=${url}`, '_blank');
    },
    async shareToTwitter() {
      if (!this.hasElevationValue) { return; }
      sendEvent('share', 'twitter');
      const url = this.getShareUrl();
      window.open(`https://twitter.com/intent/tweet?text=${this.shareText}&url=${url}`, '_blank');
    },
  },
};
</script>
