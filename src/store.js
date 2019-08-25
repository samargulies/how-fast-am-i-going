import Vue from 'vue';
import Vuex from 'vuex';
import {
  getSpeed, getBearing, getDistance, standardDeviation, convertSpeed,
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
    tempLocations: [],
    colorScheme: localStorage.getItem('colorScheme') || 'auto',
  },
  getters: {
    standardDeviation(state) {
      if (state.tempLocations.length < 3) {
        return Number.MAX_SAFE_INTEGER;
      }
      const readings = [];
      state.tempLocations.slice(-5).forEach((location, index) => {
        if (index === 0) { return; }
        const previousLocation = state.tempLocations[index - 1];
        readings.push(getSpeed(previousLocation, location));
      });
      return standardDeviation(readings);
    },
    speedReadings(state) {
      if (state.locations.length < 2) {
        return [];
      }
      const readings = [];
      state.locations.forEach((location, index) => {
        if (index === 0) { return; }
        const previousLocation = state.locations[index - 1];
        readings.push(convertSpeed(getSpeed(previousLocation, location), state.units));
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
      // console.log(locationC.coords.accuracy);
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
          dispatch('setLocation', location);
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
    setLocation({ state, commit, getters }, location) {
      if (state.locationHasSteadied) {
        commit('addLocation', location);
        return;
      }
      commit('addTempLocation', location);
      if (getters.standardDeviation < 5) {
        commit('setItem', { item: 'locationHasSteadied', value: true });
        commit('setItem', { item: 'tempLocations', value: [] });
        commit('addLocation', location);
      }
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
    clearLocations({ commit }) {
      commit('setItem', { item: 'locations', value: [] });
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
    addTempLocation(state, location) {
      // console.log(location);
      if (location.coords.longitude && location.coords.latitude) {
        state.tempLocations.push(location);
      }
    },
  },
});
