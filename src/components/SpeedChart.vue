<template>
  <div v-if="supportsLocation">
    <div class="speed-chart" :class="loading ? 'loading' : ''">
      <svg style="width:0; height:0; position:absolute;" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="fillColor" x1="1" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#f13a3a" />
            <stop offset="100%" stop-color="rgba(241, 58, 58, 0)" />
          </linearGradient>
        </defs>
      </svg>
      <TrendChart
        :min="0"
        :max="maxReading"
        :datasets="[{
            data: speedReadings,
            smooth: true,
            fill: true,
            }]"
      />
      <a class="button" @click.prevent="clearLocations">{{ $t('reset') }}</a>
    </div>
  </div>
</template>
<script>
import TrendChart from 'vue-trend-chart';
import { mapState, mapGetters } from 'vuex';

export default {
  components: {
    TrendChart,
  },
  computed: {
    ...mapState(['units', 'loading', 'supportsLocation']),
    ...mapGetters(['speedReadings']),
    maxReading() {
      const max = Math.max(...this.speedReadings);
      // max sure the y axis is at least 0-10
      return max > 10 ? max : 10;
    },
  },
  methods: {
    clearLocations() {
      this.$store.dispatch('clearLocations');
    },
  },
};
</script>
<style lang="scss">
.speed-chart .vtc {
  .stroke {
    stroke: var(--brand);
    stroke-width: 2;
  }
  .fill {
    fill: url(#fillColor);
    fill-opacity: 0.5;
  }
}
.slide-enter-active {
  transition: all 0.5s ease-in-out;
}
.slide-leave-active {
  transition: all 0.5s ease-out;
}
.slide-enter,
.slide-leave-to {
  transform: scaleY(0);
  opacity: 0;
  margin-top: -10em;
}
</style>
