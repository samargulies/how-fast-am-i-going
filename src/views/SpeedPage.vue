<template>
  <div :class="[online ? 'online' : 'offline','page page--elevation']">
    <h1>
      <router-link :to="pathForLocale({path: '/'})">
        {{ $t('site-title') }}
      </router-link>
    </h1>
    <DataReadings />
    <Settings />
    <TheFooter/>
  </div>
</template>

<script>
import { pathForLocale } from '@/helpers';
import DataReadings from '@/components/DataReadings.vue';
import Settings from '@/components/Settings.vue';
import TheFooter from '@/components/TheFooter.vue';


export default {
  components: {
    DataReadings,
    Settings,
    TheFooter,
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
    this.$store.dispatch('setUseFeet', this.$t('units.feet-default') === 'true');
    this.$store.dispatch('getUserLocation');
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  },
};
</script>
