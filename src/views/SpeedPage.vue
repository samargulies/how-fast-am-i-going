<template>
  <div class="page page--speed">
    <h1>
      <router-link :to="pathForLocale({path: '/'})">
        {{ $t('site-title') }}
      </router-link>
    </h1>
    <!-- Ezoic - Under Page Title - under_page_title -->
    <Ezoic id="102"/>
    <!-- End Ezoic - Under Page Title - under_page_title -->
    <DataReadings />
    <Settings />
    <!-- Ezoic - Above Speed Chart - mid_content -->
    <Ezoic id="104"/>
    <!-- End Ezoic - Above Speed Chart - mid_content -->
    <SpeedChart />
    <!-- Ezoic - Under Readings - under_first_paragraph -->
    <Ezoic id="103"/>
    <!-- End Ezoic - Under Readings - under_first_paragraph -->
    <TheFooter />
  </div>
</template>
<script>
import SpeedChart from '@/components/SpeedChart.vue';
import { pathForLocale } from '@/helpers';
import DataReadings from '@/components/DataReadings.vue';
import Settings from '@/components/Settings.vue';
import TheFooter from '@/components/TheFooter.vue';
import Ezoic from '@/components/Ezoic.vue';

export default {
  components: {
    DataReadings,
    Settings,
    TheFooter,
    SpeedChart,
    Ezoic,
  },
  data() {
    return {
      online: navigator.onLine,
      hasFocus: true,
    };
  },
  metaInfo() {
    return {
      title: this.formattedTitle,
    };
  },
  methods: {
    pathForLocale,
  },
  created() {
    this.$store.dispatch('getUserLocation');
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
