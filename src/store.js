import Vue from 'vue';
import Vuex from 'vuex';
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
    currentSpeed(state) {
      if (state.locations.length > 1) {
        return state.locations[state.locations.length - 1].speed;
      }
      return 0;
    },
    averageSpeed(state) {
      if (state.locations.length < 2) {
        return 0;
      }
      let totalDuration = 0;
      const speeds = state.locations.reduce((a, b) => {
        const duration = b.position.timestamp || 0 - a.position.timestamp || 0;
        totalDuration += duration;
        return (a.speed || 0 + b.speed || 0) * duration;
      }, 0);
      return speeds / totalDuration;
    },
    currentBearing(state) {
      if (state.locations.length > 1) {
        const locationA = state.locations[state.locations.length - 2];
        const locationB = state.locations[state.locations.length - 1];
        return getBearing(locationA.position, locationB.position);
      }
      return null;
    },
  },
  actions: {
    getUserLocation({ commit, dispatch }) {
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
    },
    setLocation({ state, commit }, position) {
      let speed = 0;
      if (state.locations.length > 1) {
        const lastLocation = state.locations[state.locations.length - 1];
        const timeSinceLastUpdate = position.timestamp - lastLocation.position.timestamp;
        if (timeSinceLastUpdate < 10 * 1000) {
          // TODO: merge instead of ignoring
          return;
        }
        speed = getSpeed(lastLocation.position, position);
      }
      const location = { position, speed };
      console.log(location);
      commit('addLocation', location);
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
