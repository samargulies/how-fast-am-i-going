<template>
  <div class="elevation-reading">
    <div v-if="loading || !locationHasSteadied" class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
    <div v-else>
      <div :class="['topline-readings', watchId ? 'watching' : 'not-watching']">
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
    ...mapState(['units', 'loading', 'watchId', 'locationHasSteadied']),
    ...mapGetters(['currentBearing', 'currentSpeed', 'averageSpeed']),
  },
};
</script>
