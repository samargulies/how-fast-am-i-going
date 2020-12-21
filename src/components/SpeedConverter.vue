<template>
<div class="page--converter">
  <div class="converter-container">
    <div class="converter-box">
      <input
        class="converter-box__value"
        type="number"
        v-model="firstValue"
        @input="updateSecondValue"
      />
      <select class="converter-box__unit" v-model="firstUnit">
        <option v-for="(format, index) in formats" :key="index" :value="index">{{format.name}}</option>
      </select>
    </div>
    <div class="equal-sign">=</div>
    <div class="converter-box">
      <input
        class="converter-box__value"
        type="number"
        v-model="secondValue"
        @input="updateFirstValue"
      />
      <select class="converter-box__unit" v-model="secondUnit">
        <option v-for="(format, index) in formats" :key="index" :value="index">{{format.name}}</option>
      </select>
    </div>
  </div>
  <div class="formula">
    <h3>Formula</h3>
    <p>
    {{firstFormat.name}}
    &times; {{formula}}
    = {{secondFormat.name}}
    </p>
  </div>
</div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import { round } from '@/helpers';

export default {
  data() {
    return {
      firstValue: '60',
      firstUnit: 0,
      secondValue: '96.56',
      secondUnit: 2,
      formats: [
        {
          shortName: 'mph',
          name: 'Miles per hour',
          mpsMultiplier: 2.236936,
        },
        {
          shortName: 'knots',
          name: 'Knots',
          mpsMultiplier: 1.943844,
        },
        {
          shortName: 'km/h',
          name: 'Kilometers per hour',
          mpsMultiplier: 3.6,
        },
        {
          shortName: 'm/s',
          name: 'Meters per second',
          mpsMultiplier: 1,
        },
      ],
    };
  },
  computed: {
    ...mapState(['units', 'loading', 'watchId', 'supportsLocation']),
    ...mapGetters(['currentSpeed', 'averageSpeed']),
    firstFormat() {
      return this.formats[this.firstUnit];
    },
    secondFormat() {
      return this.formats[this.secondUnit];
    },
    formula() {
      return round(this.firstFormat.mpsMultiplier / this.secondFormat.mpsMultiplier, 6);
    },
  },
  methods: {
    updateFirstValue() {
      let secondValue = parseFloat(this.secondValue);
      if (Number.isNaN(secondValue)) {
        secondValue = 0;
      }
      const secondValueMs = parseFloat(secondValue) / this.secondFormat.mpsMultiplier;
      this.firstValue = round(secondValueMs * this.firstFormat.mpsMultiplier, 1);
    },
    updateSecondValue() {
      let firstValue = parseFloat(this.firstValue);
      if (Number.isNaN(firstValue)) {
        firstValue = 0;
      }
      const firstValueMs = parseFloat(firstValue) / this.firstFormat.mpsMultiplier;
      this.secondValue = round(firstValueMs * this.secondFormat.mpsMultiplier, 1);
    },
  },
  watch: {
    firstUnit(newFirstUnit, oldFirstUnit) {
      // if the units are changed to be the same, flip them instead
      if (newFirstUnit === this.secondUnit) {
        this.secondUnit = oldFirstUnit;
      }
      this.updateSecondValue();
    },
    secondUnit(newSecondUnit, oldSecondUnit) {
      // if the units are changed to be the same, flip them instead
      if (newSecondUnit === this.firstUnit) {
        this.firstUnit = oldSecondUnit;
      }
      this.updateFirstValue();
    },
  },
};
</script>
