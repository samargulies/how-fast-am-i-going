<template>
  <transition name="slide">
    <div class="speed-chart" v-if="speedReadings.length > 2">
      <svg style="width:0; height:0; position:absolute;" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="fillColor" x1="1" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#f13a3a"></stop>
            <stop offset="100%" stop-color="rgba(241, 58, 58, 0)"></stop>
          </linearGradient>
        </defs>
      </svg>
      <TrendChart :datasets="dataSets" :min="0" />
      <a class="button" @click.prevent="clearLocations">Reset</a>
    </div>
  </transition>
</template>
<script>
import TrendChart from 'vue-trend-chart';
import { mapState, mapGetters } from 'vuex';

export default {
  components: {
    TrendChart,
  },
  computed: {
    ...mapState(['units']),
    ...mapGetters(['speedReadings']),
    dataSets() {
      return [{
        data: this.speedReadings,
        smooth: true,
        fill: true,
      }];
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
.slide-enter-active {
  transition: all 0.5s ease-in-out;
}
.slide-leave-active {
  transition: all 0.5s ease-out;
}
.slide-enter, .slide-leave-to {
  transform: scaleY(0);
  opacity: 0;
  margin-top: -10em;
}
</style>
