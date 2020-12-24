<template>
  <div class="elevation-reading" :class="loading ? 'loading' : ''">
    <div v-if="loading" class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
    <div v-if="!supportsLocation" class="location-error">
      <p>{{ $t('location-read-error') }}</p>
    </div>
    <div v-else :class="['topline-readings', watchId ? 'watching' : 'not-watching']">
      <div class="reading reading--avg-speed">
        <div class="reading__value">
          <i18n path="location-format" tag="div">
            <template v-slot:value>
              <span>
                {{ averageSpeed }}
              </span>
            </template>
            <template v-slot:units>
              <span>{{ $t(`units.${units}`) }}</span>
            </template>
          </i18n>
        </div>
        <div class="reading__label">{{ $t('avg-speed') }}</div>
      </div>
      <div class="reading reading--speed">
        <div class="reading__value">
          <i18n path="location-format" tag="div">
            <template v-slot:value>
              <span>
                {{ currentSpeed }}
              </span>
            </template>
            <template v-slot:units>
              <span>{{ $t(`units.${units}`) }}</span>
            </template>
          </i18n>
        </div>
        <div class="reading__label">{{ $t('current-speed') }}</div>
      </div>
      <div class="reading">
        <div class="reading__value" v-if="currentHeadingFormatted !== null">
          {{ currentHeadingFormatted }}
        </div>
        <div class="reading__label">{{ $t('heading') }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import { convertSpeed, numberFormatted } from '@/helpers';

export default {
  data() {
    return {
      locationFormat: this.$t('location-format'),
    };
  },
  computed: {
    ...mapState(['units', 'loading', 'watchId', 'supportsLocation']),
    ...mapGetters(['currentHeadingFormatted']),
    currentSpeed() {
      const speed = convertSpeed(this.$store.getters.currentSpeed, { units: this.units });
      return numberFormatted(speed, { locale: this.$t.locale });
    },
    averageSpeed() {
      const speed = convertSpeed(this.$store.getters.averageSpeed, { units: this.units });
      return numberFormatted(speed, { locale: this.$t.locale });
    },
  },
};
</script>
