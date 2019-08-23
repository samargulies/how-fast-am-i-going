import Vue from 'vue';
import Vuex from 'vuex';
import KalmanFilter from 'kalmanjs';
import { getSpeed, getBearing } from '@/helpers';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
    locations: [],
    useFeet: true,
    supportsLocation: false,
    watchId: null,
    colorScheme: localStorage.getItem('colorScheme') || 'auto',
  },
  getters: {
    smoothedLocations(state) {
      const filterLatitude = new KalmanFilter();
      const filterLongitude = new KalmanFilter();
      return state.locations.slice(-10).map(location => ({
        latitude: filterLatitude.filter(location.coords.latitude),
        longitude: filterLongitude.filter(location.coords.longitude),
        timestamp: location.timestamp,
      }));
    },
    currentSpeed(state, getters) {
      if (getters.smoothedLocations.length > 1) {
        const locationA = getters.smoothedLocations[getters.smoothedLocations.length - 2];
        const locationB = state.locations[state.locations.length - 1];
        return getSpeed(locationA, locationB);
      }
      return 0;
    },
    averageSpeed(state, getters) {
      return 0;
      // if (getters.smoothedLocations.length < 2) {
      //   return 0;
      // }
      // let totalDuration = 0;
      // const speeds = getters.smoothedLocations.reduce((a, b) => {
      //   const duration = b.timestamp || 0 - a.timestamp || 0;
      //   totalDuration += duration;
      //   return (a.speed || 0 + b.speed || 0) * duration;
      // }, 0);
      // return speeds / totalDuration;
    },
    currentBearing(state, getters) {
      if (getters.smoothedLocations.length > 1) {
        const locationA = getters.smoothedLocations[getters.smoothedLocations.length - 2];
        const locationB = getters.smoothedLocations[getters.smoothedLocations.length - 1];
        return getBearing(locationA, locationB);
      }
      return null;
    },
  },
  actions: {
    getUserLocation({ commit, dispatch }) {
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
    setUseFeet({ commit }, isFeet) {
      commit('setItem', { item: 'useFeet', value: isFeet });
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
      state.locations.push(location);
    },
  },
});
