<template>
  <div class="page page--calculate">
    <h1>
      <router-link :to="pathForLocale({path: '/'})">
        {{ $t('calculator-title') }}
      </router-link>
    </h1>
    <!-- Ezoic - Under Page Title - under_page_title -->
    <Ezoic id="102"/>
    <!-- End Ezoic - Under Page Title - under_page_title -->
    <SpeedCalculator />
    <!-- Ezoic - Above Speed Chart - mid_content -->
    <Ezoic id="104"/>
    <!-- End Ezoic - Above Speed Chart - mid_content -->
    <TheFooter page="calculator" />
  </div>
</template>
<script>
import { pathForLocale } from '@/helpers';
import TheFooter from '@/components/TheFooter.vue';
import Ezoic from '@/components/Ezoic.vue';
import SpeedCalculator from '@/components/SpeedCalculator.vue';

export default {
  components: {
    SpeedCalculator,
    TheFooter,
    Ezoic,
  },
  data() {
    return {};
  },
  metaInfo() {
    return {
      title: this.$t('calculator-title'),
    };
  },
  methods: {
    pathForLocale,
  },
};
</script>
