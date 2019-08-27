<template>
  <div class="elevation-reading">
    <div v-if="loading" class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
    <div v-else-if="!supportsLocation" class="location-error">
      <p>An error occurred loading your current location.</p>
    </div>
    <div v-else :class="['topline-readings', watchId ? 'watching' : 'not-watching']">
      <div class="reading reading--avg-speed">
        <div class="reading__value">
          <i18n path="location-format" tag="div">
            <span place="value">
              {{ averageSpeed | numberFormatted({units, locale: $t.locale}) }}
            </span>
            <span place="units">{{ $t(`units.${units}`) }}</span>
          </i18n>
        </div>
        <div class="reading__label">Average Speed</div>
      </div>
      <div class="reading reading--speed">
        <div class="reading__value">
          <i18n path="location-format" tag="div">
            <span place="value">
              {{ currentSpeed | numberFormatted({units, locale: $t.locale}) }}
            </span>
            <span place="units">{{ $t(`units.${units}`) }}</span>
          </i18n>
        </div>
        <div class="reading__label">Current Speed</div>
      </div>
      <div class="reading">
        <div class="reading__value" v-if="currentBearing !== null">
          {{ currentBearing | bearingFormatted }}
        </div>
        <div class="reading__label">Bearing</div>
      </div>
    </div>
    <!-- <div class="metadata">
      <div class="watching-indicator" v-if="watchId">
        Watching for updates
      </div>
    </div> -->
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
    ...mapState(['units', 'loading', 'watchId', 'supportsLocation']),
    ...mapGetters(['currentBearing', 'currentSpeed', 'averageSpeed']),
  },
};
</script>
