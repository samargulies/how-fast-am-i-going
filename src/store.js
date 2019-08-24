import Vue from 'vue';
import Vuex from 'vuex';
import {
  getSpeed, getBearing, getDistance, standardDeviation,
} from '@/helpers';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
    locations: [],
    units: 'kmh',
    supportsLocation: false,
    watchId: null,
    locationHasSteadied: false,
    colorScheme: localStorage.getItem('colorScheme') || 'auto',
  },
  getters: {
    standardDeviation(state, getters) {
      if (getters.speedReadings.length === 0) {
        return 0;
      }
      return standardDeviation(getters.speedReadings);
    },
    speedReadings(state) {
      if (state.locations.length < 2) {
        return [];
      }
      const readings = [];
      state.locations.forEach((location, index) => {
        if (index === 0) { return; }
        const previousLocation = state.locations[index - 1];
        readings.push(getSpeed(previousLocation, location));
      });
      return readings;
    },
    currentSpeed(state) {
      if (state.locations.length < 3) {
        return 0;
      }
      const locationA = state.locations[state.locations.length - 3];
      const locationB = state.locations[state.locations.length - 2];
      const locationC = state.locations[state.locations.length - 1];
      console.log(locationC.coords.accuracy);
      const sampleA = getSpeed(locationA, locationC);
      const sampleB = getSpeed(locationB, locationC);
      const speed = (sampleA + sampleB) / 2;
      return speed;
    },
    averageSpeed(state) {
      if (state.locations.length < 2) {
        return 0;
      }
      let totalDistance = 0;
      state.locations.forEach((location, index) => {
        if (index === 0) { return; }
        const previousLocation = state.locations[index - 1];
        totalDistance += getDistance(previousLocation, location);
      });
      const totalDuration = (state.locations[state.locations.length - 1].timestamp - state.locations[0].timestamp) / (1000 * 60 * 60);
      // console.log({ totalDistance, totalDuration });
      return totalDistance / totalDuration;
    },
    currentBearing(state) {
      if (state.locations.length < 3) {
        return null;
      }
      const locationA = state.locations[state.locations.length - 3];
      const locationB = state.locations[state.locations.length - 2];
      const locationC = state.locations[state.locations.length - 1];
      const sampleA = getBearing(locationA, locationC);
      const sampleB = getBearing(locationB, locationC);
      const bearing = (sampleA + sampleB) / 2;
      return bearing;
    },
  },
  actions: {
    getUserLocation({ state, commit, dispatch }) {
      if (state.watchId !== null) {
        console.log('existing watch');
        dispatch('stopWatchingUserLocation');
      }
      const watchId = navigator.geolocation.watchPosition(
        (location) => {
          commit('addLocation', location);
          dispatch('setSupportsLocation', true);
          dispatch('setLoading', false);
        },
        error => dispatch('locationError', error),
        {
          enableHighAccuracy: true,
          timeout: 30 * 1000,
        },
      );
      commit('setItem', { item: 'watchId', value: watchId });
      commit('setItem', { item: 'locationHasSteadied', value: false });
    },
    locationError({ commit, dispatch }, error) {
      console.warn('location access denied', error);
      commit('setItem', { item: 'loading', value: false });
      dispatch('setSupportsLocation', false);
    },
    stopWatchingUserLocation({ state, commit }) {
      navigator.geolocation.clearWatch(state.watchId);
      commit('setItem', { item: 'watchId', value: null });
    },
    setLoading({ commit }, isLoading) {
      commit('setItem', { item: 'loading', value: isLoading });
    },
    setUnits({ commit }, units) {
      commit('setItem', { item: 'units', value: units });
    },
    setSupportsLocation({ commit }, supportsLocation) {
      commit('setItem', { item: 'supportsLocation', value: supportsLocation });
    },
    setColorScheme({ commit }, colorScheme) {
      localStorage.setItem('colorScheme', colorScheme);
      commit('setItem', { item: 'colorScheme', value: colorScheme });
    },

  },
  mutations: {
    setItem(state, { item, value }) {
      Vue.set(state, item, value);
    },
    addLocation(state, location) {
      // console.log(location);
      if (location.coords.longitude && location.coords.latitude) {
        state.locations.push(location);
      }
    },
  },
});
