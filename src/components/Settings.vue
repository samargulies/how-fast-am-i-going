<template>
  <div class="set-location">
    <div class="">
      <div id="location">
        <div class="coordinates"></div>
      </div>
      <div class="settings">
        <div id="choose-units">
          <a @click="setUnits('mph')"
            v-if="!hideUnitSelection"
            :class="['button', 'units', 'units--mph', units === 'mph' ? 'units-selected' : '']">
            {{ $t('units.mph') }}
          </a>
          <a @click="setUnits('kmh')"
            :class="['button', 'units', 'units--kmh', units === 'kmh' ? 'units-selected' : '']">
            {{ $t('units.kmh') }}
          </a>
          <a @click="setUnits('kn')"
            :class="['button', 'units', 'units--kn', units === 'kn' ? 'units-selected' : '']">
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
