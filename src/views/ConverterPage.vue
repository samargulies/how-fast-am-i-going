<template>
  <div class="page page--convert">
    <h1>
      <router-link :to="pathForLocale({path: '/'})">
        {{ $t('converter-title') }}
      </router-link>
    </h1>
    <!-- Ezoic - Under Page Title - under_page_title -->
    <Ezoic id="102"/>
    <!-- End Ezoic - Under Page Title - under_page_title -->
    <SpeedConverter />
    <!-- Ezoic - Above Speed Chart - mid_content -->
    <Ezoic id="104"/>
    <!-- End Ezoic - Above Speed Chart - mid_content -->
    <TheFooter page="converter" />
  </div>
</template>
<script>
import { pathForLocale } from '@/helpers';
import TheFooter from '@/components/TheFooter.vue';
import Ezoic from '@/components/Ezoic.vue';
import SpeedConverter from '@/components/SpeedConverter.vue';

export default {
  components: {
    TheFooter,
    Ezoic,
    SpeedConverter,
  },
  data() {
    return {};
  },
  metaInfo() {
    return {
      title: this.$t('converter-title'),
    };
  },
  methods: {
    pathForLocale,
  },
};
</script>
