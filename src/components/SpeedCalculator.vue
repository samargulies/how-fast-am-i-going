<template>
  <div class="page--calculator">
    <div class="calculator-container">
      <div class="converter-box">
        <label for="distance">Distance</label>
        <input
          class="converter-box__value"
          type="number"
          id="distance"
          v-model="distance"
          @input="distanceUpdated"
        />
        <select class="converter-box__unit" v-model="distanceUnit">
          <option
            v-for="(format, index) in distanceFormats"
            :key="index"
            :value="index"
          >{{format.name}}</option>
        </select>
      </div>
      <div class="converter-box">
        <label for="duration">Duration</label>
        <input
          class="converter-box__value"
          type="number"
          id="duration"
          v-model="duration"
          @input="durationUpdated"
        />
        <select class="converter-box__unit" v-model="durationUnit">
          <option
            v-for="(format, index) in durationFormats"
            :key="index"
            :value="index"
          >{{format.name}}</option>
        </select>
      </div>
      <div class="converter-box">
        <label for="speed">Speed</label>
        <input
          readonly
          class="converter-box__value"
          id="speed"
          v-model="speed"
        />
        <select class="converter-box__unit" v-model="speedUnit">
          <option
            v-for="(format, index) in speedFormats"
            :key="index"
            :value="index"
          >{{format.name}}</option>
        </select>
      </div>
    </div>
    <!-- <div class="formula">
      <h3>Formula</h3>
      <p></p>
    </div> -->
  </div>
</template>
<script>
import { round } from '@/helpers';

export default {
  data() {
    return {
      distance: '1',
      distanceUnit: 0,
      duration: '1',
      durationUnit: 0,
      speedUnit: 2,
      distanceFormats: [
        {
          shortName: 'mi',
          name: 'Miles',
          multiplier: 1609.34,
        },
        {
          shortName: 'km',
          name: 'Kilometers',
          multiplier: 1000,
        },
        {
          shortName: 'm',
          name: 'Meters',
          multiplier: 1,
        },
      ],
      durationFormats: [
        {
          shortName: 'h',
          name: 'Hours',
          multiplier: 60 * 60,
        },
        {
          shortName: 'm',
          name: 'Minutes',
          multiplier: 60,
        },
        {
          shortName: 's',
          name: 'Seconds',
          multiplier: 1,
        },
      ],
      speedFormats: [
        {
          shortName: 'mph',
          name: 'Miles per hour',
          multiplier: 2.236936,
        },
        {
          shortName: 'knots',
          name: 'Knots',
          multiplier: 1.943844,
        },
        {
          shortName: 'km/h',
          name: 'Kilometers per hour',
          multiplier: 3.6,
        },
        {
          shortName: 'm/s',
          name: 'Meters per second',
          multiplier: 1,
        },
      ],
    };
  },
  computed: {
    speed() {
      return round((this.distanceInMeters / this.durationInSeconds) * this.speedFormat.multiplier, 1);
    },
    distanceInMeters() {
      return this.distance * this.distanceFormat.multiplier;
    },
    durationInSeconds() {
      return this.duration * this.durationFormat.multiplier;
    },
    distanceFormat() {
      return this.distanceFormats[this.distanceUnit];
    },
    durationFormat() {
      return this.durationFormats[this.durationUnit];
    },
    speedFormat() {
      return this.speedFormats[this.speedUnit];
    },
  },
};
</script>
