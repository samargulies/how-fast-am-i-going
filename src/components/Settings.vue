<template>
  <div class="set-location">
    <div class="">
      <div id="location">
        <div class="coordinates"></div>
      </div>
      <div class="settings">
        <div id="choose-units" class="button" v-if="!hideUnitSelection">
          <a @click="setUnits('mph')"
            :class="['units', 'units--mph', units === 'mph' ? 'units-selected' : '']">
            {{ $t('units.mph') }}
          </a>
          <a @click="setUnits('kmh')"
            :class="['units', 'units--kmh', units === 'kmh' ? 'units-selected' : '']">
            {{ $t('units.kmh') }}
          </a>
          <a @click="setUnits('kn')"
            :class="['units', 'units--kn', units === 'kn' ? 'units-selected' : '']">
            {{ $t('units.kn') }}
          </a>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['units']),
    hideUnitSelection() {
      return this.$t('units.hide-selection') === 'true';
    },
  },
  methods: {
    setUnits(units) {
      this.$store.dispatch('setUnits', units);
    },
  },
};
</script>
