<template>
  <div class="set-location">
    <div class="">
      <div id="location">
        <div class="coordinates"></div>
      </div>
      <div class="settings">
        <a id="choose-units" class="button" v-if="!hideUnitSelection" @click="toggleUnits">
          <span :class="['units', 'units--feet', useFeet ? 'units-selected' : '']">
            {{ $t('units.mph') }}
          </span>
          <span :class="['units', 'units--meters', !useFeet ? 'units-selected' : '']">
            {{ $t('units.kmh') }}
          </span>
        </a>
      </div>
    </div>

  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['useFeet']),
    hideUnitSelection() {
      return this.$t('units.hide-selection') === 'true';
    },
  },
  methods: {
    toggleUnits() {
      this.$store.dispatch('setUseFeet', !this.useFeet);
    },
  },
};
</script>
