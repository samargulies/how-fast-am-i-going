<template>
  <div class="elevation-reading">
    <div v-if="loading" class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
    <div v-else>
      <div class="topline-readings">
        <div class="reading reading--avg-speed">
          <div class="reading__value">
            <i18n path="location-format" tag="div" v-if="watchId">
              <span place="value">
                {{ averageSpeed | numberFormatted({useFeet, locale: $t.locale}) }}
              </span>
              <span place="units">{{ $t(useFeet ? 'units.mph' : 'units.kmh') }}</span>
            </i18n>
          </div>
          <div class="reading__label">Average Speed</div>
        </div>
        <div class="reading reading--speed">
          <div class="reading__value">
            <i18n path="location-format" tag="div" v-if="watchId">
              <span place="value">
                {{ currentSpeed | numberFormatted({useFeet, locale: $t.locale}) }}
              </span>
              <span place="units">{{ $t(useFeet ? 'units.mph' : 'units.kmh') }}</span>
            </i18n>
          </div>
          <div class="reading__label">Current Speed</div>
        </div>
        <div class="reading">
          <div class="reading__value" v-if="watchId && currentBearing !== null">
            {{ currentBearing | bearingFormatted }}
          </div>
          <div class="reading__label">Bearing</div>
        </div>
      </div>
      <!-- <div class="metadata">
        <div class="watching" v-if="watchId">
          Watching for updates
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      locationFormat: this.$t('location-format'),
    };
  },
  computed: {
    ...mapState(['useFeet', 'loading', 'watchId']),
    ...mapGetters(['currentBearing', 'currentSpeed', 'averageSpeed']),
  },
};
</script>
