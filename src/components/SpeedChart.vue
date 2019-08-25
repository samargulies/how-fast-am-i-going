<template>
  <div class="speed-chart">
    <svg style="width:0; height:0; position:absolute;" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="fillColor" x1="1" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#f13a3a"></stop>
          <stop offset="100%" stop-color="rgba(241, 58, 58, 0)"></stop>
        </linearGradient>
      </defs>
    </svg>
    <TrendChart v-if="speedReadings.length > 2"
      :datasets="[{data: speedReadings, smooth: true, fill: true}]"
      :interactive="true"
      :min="0" />
  </div>
</template>
<script>
import TrendChart from 'vue-trend-chart';
import { mapState } from 'vuex';

export default {
  components: {
    TrendChart,
  },
  computed: {
    ...mapState(['units']),
    speedReadings() {
      return this.$store.getters.speedReadings;
    },
  },
};
</script>
<style lang="scss">
.speed-chart {
  .stroke {
    stroke: var(--brand);
    stroke-width: 2;
  }
  .fill {
    fill: url(#fillColor);
    fill-opacity: 0.5;
  }
}
</style>
