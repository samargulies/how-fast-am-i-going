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
    currentSpeed(state) {
      if (state.locations.length > 2) {
        const locationA = state.locations[state.locations.length - 3];
        const locationB = state.locations[state.locations.length - 2];
        const locationC = state.locations[state.locations.length - 1];
        const sampleA = getSpeed(locationA, locationC);
        const sampleB = getSpeed(locationB, locationC);
        return (sampleA + sampleB) / 2;
      }
      return 0;
    },
    averageSpeed(state) {
      if (state.locations.length < 2) {
        return 0;
      }
      let totalDuration = 0;
      let totalSpeeds = 0;
      state.locations.forEach((location, index) => {
        if (index === 0) { return; }
        const previousLocation = state.locations[index - 1];
        const duration = location.timestamp - previousLocation.timestamp;
        totalSpeeds += getSpeed(previousLocation, location) * duration;
        totalDuration += duration;
      });
      return totalSpeeds / totalDuration;
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
      console.log(location);
      state.locations.push(location);
    },
  },
});
