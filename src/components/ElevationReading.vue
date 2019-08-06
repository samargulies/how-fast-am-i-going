<template>
  <div class="elevation-reading">
    <div v-if="loading" class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
    <div v-else>
      <i18n path="location-format" tag="div" id="elevation" v-if="Number.isFinite(elevation.value)">
        <span place="value">
          {{ elevation.value | numberFormatted({useFeet, locale: $t.locale}) }}
        </span>
        <span place="units">{{ $t(useFeet ? 'units.feet' : 'units.meters') }}</span>
      </i18n>
      <div class="metadata">
        <!-- <div class="watching" v-if="watchId && Number.isFinite(elevation.value)">
          Watching for updates
        </div> -->
        <div id="elevation-source" v-if="supportsElevation && !location.title">
          <div class="source source--phone" v-if="elevation.source === 'phone'">
            <span class="accuracy" v-if="Number.isFinite(elevation.accuracy)">
              ± {{ elevation.accuracy | numberFormatted({useFeet, locale: $t.locale}) }}
              {{ $t(useFeet ? 'units.feet' : 'units.meters') }}
            </span>
            <span>{{ $t('source.phone.description') }}</span>
            <a @click="toggleSource" class="button toggle-source--web">
              {{ $t('source.web.toggle') }}
            </a>
          </div>
          <div class="source source--web" v-else>
            <span>{{ $t('source.web.description') }}</span>
            <a @click="toggleSource" class="button toggle-source--phone">
              {{ $t('source.phone.toggle') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      locationFormat: this.$t('location-format'),
    };
  },
  computed: {
    ...mapState(['useFeet', 'elevation', 'loading', 'supportsElevation', 'location', 'watchId']),
  },
  methods: {
    toggleSource() {
      if (!this.supportsElevation) {
        return;
      }
      if (this.elevation.source === 'phone') {
        this.$store.dispatch('fetchElevation');
      } else {
        this.$store.dispatch('getUserLocation');
      }
    },
  },
};
</script>
