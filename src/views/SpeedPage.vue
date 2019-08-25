<template>
  <div :class="[online ? 'online' : 'offline','page page--elevation']">
    <h1>
      <router-link :to="pathForLocale({path: '/'})">
        {{ $t('site-title') }}
      </router-link>
    </h1>
    <DataReadings />
    <Settings />
    <SpeedChart />
    <TheFooter/>
  </div>
</template>
<script>
import SpeedChart from '@/components/SpeedChart.vue';
import { pathForLocale } from '@/helpers';
import DataReadings from '@/components/DataReadings.vue';
import Settings from '@/components/Settings.vue';
import TheFooter from '@/components/TheFooter.vue';


export default {
  components: {
    DataReadings,
    Settings,
    TheFooter,
    SpeedChart,
  },
  data() {
    return {
      online: navigator.onLine,
    };
  },
  methods: {
    updateOnlineStatus() {
      this.online = navigator.onLine;
    },
    pathForLocale,
  },
  created() {
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
