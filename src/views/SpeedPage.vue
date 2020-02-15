<template>
  <div :class="[online ? 'online' : 'offline','page page--elevation']">
    <h1>
      <router-link :to="pathForLocale({path: '/'})">
        {{ $t('site-title') }}
      </router-link>
    </h1>
    <!-- Ezoic - Under Page Title - under_page_title -->
    <div id="ezoic-pub-ad-placeholder-102"> </div>
    <!-- End Ezoic - Under Page Title - under_page_title -->
    <DataReadings />
    <Settings />
    <!-- Ezoic - Above Speed Chart - mid_content -->
    <div id="ezoic-pub-ad-placeholder-104"> </div>
    <!-- End Ezoic - Above Speed Chart - mid_content -->
    <SpeedChart />
    <!-- Ezoic - Under Readings - under_first_paragraph -->
    <div id="ezoic-pub-ad-placeholder-103"> </div>
    <!-- End Ezoic - Under Readings - under_first_paragraph -->
    <TheFooter :page="page" />
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
  props: ['page'],
  data() {
    return {
      online: navigator.onLine,
      hasFocus: true,
    };
  },
  computed: {
    formattedTitle() {
      return this.page ? this.$t(`page.${this.page}.heading`) : null;
    },
  },
  metaInfo() {
    return {
      title: this.formattedTitle,
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
      this.hasFocus = true;
      this.$store.dispatch('getUserLocation');
    });
    window.addEventListener('blur', () => {
      this.hasFocus = false;
      setTimeout(() => {
        if (!this.hasFocus) {
          this.$store.dispatch('stopWatchingUserLocation');
        }
      }, 30 * 1000);
    });
  },
};
</script>
