<template>
  <div class="elevation-reading">
    <div v-if="loading" class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
    <div v-else>
      <i18n path="location-format" tag="div" id="elevation" v-if="elevation.value !== null">
        <span place="value">{{ displayElevation }}</span>
        <span place="units">{{ $t(useFeet ? 'units.feet' : 'units.meters') }}</span>
      </i18n>
      <div class="metadata">
        <div id="elevation-source" v-if="supportsElevation && !location.title">
          <div class="source--phone" v-if="elevation.source === 'phone'">
            <span>{{ $t('source.phone.description') }}</span>
            <a @click="toggleSource" class="button toggle-source--web">
              {{ $t('source.web.toggle') }}
            </a>
          </div>
          <div class="source--web" v-else>
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
import { round, metersToFeet } from '@/helpers';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      locationFormat: this.$t('location-format'),
    };
  },
  computed: {
    ...mapState(['useFeet', 'elevation', 'loading', 'supportsElevation', 'location']),
    displayElevation() {
      const { value } = this.elevation;
      const elevation = round(this.useFeet ? metersToFeet(value) : value, 0);
      return elevation.toLocaleString(this.$t.locale, {
        useGrouping: true,
        maximumFractionDigits: 0,
      });
    },
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
