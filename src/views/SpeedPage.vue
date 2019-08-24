<template>
  <div :class="[online ? 'online' : 'offline','page page--elevation']">
    <h1>
      <router-link :to="pathForLocale({path: '/'})">
        {{ $t('site-title') }}
      </router-link>
    </h1>
    <DataReadings />
    <Settings />
    <TrendChart class="speed-chart" v-if="speedReadings.length > 2"
      :datasets="[{data: speedReadings, smooth: true, fill: true}]"
      :interactive="true" />
    <TheFooter/>
  </div>
</template>

<script>
import TrendChart from 'vue-trend-chart';
import { pathForLocale } from '@/helpers';
import DataReadings from '@/components/DataReadings.vue';
import Settings from '@/components/Settings.vue';
import TheFooter from '@/components/TheFooter.vue';


export default {
  components: {
    DataReadings,
    Settings,
    TheFooter,
    TrendChart,
  },
  data() {
    return {
      online: navigator.onLine,
    };
  },
  computed: {
    speedReadings() {
      return this.$store.getters.speedReadings;
    },
  },
  methods: {
    updateOnlineStatus() {
      this.online = navigator.onLine;
    },
    pathForLocale,
  },
  created() {
    this.$store.dispatch('setUnits', this.$t('units.default-units'));
    this.$store.dispatch('getUserLocation');
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
    window.addEventListener('focus', () => {
      console.log('focus');
      this.$store.dispatch('getUserLocation');
    });
    window.addEventListener('blur', () => {
      console.log('blur');
      this.$store.dispatch('stopWatchingUserLocation');
    });
  },
};
</script>
