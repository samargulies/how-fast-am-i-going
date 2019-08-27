import Vue from 'vue';
import Vuex from 'vuex';
import i18n from '@/i18n';
import {
  getSpeed, getBearing, getDistance, chunk, averageOfSpeeds,
} from '@/helpers';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
    locations: [],
    units: localStorage.getItem('units') || i18n.t('units.default-units'),
    supportsLocation: true,
    watchId: null,
    colorScheme: localStorage.getItem('colorScheme') || 'auto',
  },
  getters: {
    speedReadings(state) {
      const { length } = state.locations;
      if (length < 10) {
        return [0];
      }
      // trim off any incomplete chunks
      const locations = state.locations.slice(0, length - (length % 5));
      // chunk and return the average
      return chunk(locations, 5).map(averageOfSpeeds);
    },
    currentSpeed(state) {
      if (state.locations.length < 3) {
        return 0;
      }
      let speed = 0;
      let numSamples = 0;
      const samples = state.locations.slice(-4);
      const lastLocation = samples.pop();
      samples.forEach((location) => {
        speed += getSpeed(location, lastLocation);
        numSamples += 1;
      });
      return speed / numSamples;
    },
    averageSpeed(state, getters) {
      if (state.locations.length < 4) {
        return getters.currentSpeed;
      }
      const totalDuration = (state.locations[state.locations.length - 1].timestamp
        - state.locations[0].timestamp) / (1000 * 60 * 60);

      if (totalDuration === 0) {
        return 0;
      }

      let totalDistance = 0;
      state.locations.forEach((location, index) => {
        if (index === 0) { return; }
        const previousLocation = state.locations[index - 1];
        totalDistance += getDistance(previousLocation, location);
      });
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
      const watchId = setInterval(() => {
        navigator.geolocation.getCurrentPosition((location) => {
          dispatch('setLocation', location);
        },
        error => dispatch('locationError', error),
        {
          enableHighAccuracy: true,
          timeout: 30 * 1000,
        });
      }, 500);
      commit('setItem', { item: 'watchId', value: watchId });
    },
    setLocation({ state, commit, dispatch }, location) {
      dispatch('setSupportsLocation', true);
      dispatch('setLoading', false);
      if (state.locations.length === 0) {
        commit('addLocation', location);
        return;
      }
      const previousLocation = state.locations[state.locations.length - 1];
      const timeInterval = location.timestamp - previousLocation.timestamp;
      if (timeInterval < 1000) {
        return;
      }
      commit('addLocation', location);
    },
    locationError({ dispatch }, error) {
      console.warn('location access denied', error);
      dispatch('setLoading', false);
      dispatch('setSupportsLocation', false);
    },
    stopWatchingUserLocation({ state, commit }) {
      navigator.geolocation.clearWatch(state.watchId);
      commit('setItem', { item: 'watchId', value: null });
    },
    clearLocations({ state, commit }) {
      commit('setItem', { item: 'locations', value: state.locations.slice(-1) });
    },
    setLoading({ state, commit }, isLoading) {
      if (isLoading !== state.loading) {
        commit('setItem', { item: 'loading', value: isLoading });
      }
    },
    setUnits({ commit }, units) {
      localStorage.setItem('units', units);
      commit('setItem', { item: 'units', value: units });
    },
    setSupportsLocation({ state, commit }, supportsLocation) {
      if (supportsLocation !== state.supportsLocation) {
        commit('setItem', { item: 'supportsLocation', value: supportsLocation });
      }
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
      if (location.coords.longitude && location.coords.latitude) {
        state.locations.push(location);
      }
    },
  },
});
