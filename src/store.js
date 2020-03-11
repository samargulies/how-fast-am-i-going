import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import sortLocations from './location';
import i18n from '@/i18n';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
    dataset: {},
    locations: [],
    units: localStorage.getItem('units') || i18n.t('units.default-units'),
    supportsLocation: true,
    watchId: null,
    colorScheme: localStorage.getItem('colorScheme') || 'auto',
    ezoicAds: {},
  },
  getters: {
    firstLocation(state) {
      return state.locations[0];
    },
    latestLocation(state) {
      return state.locations[state.locations.length - 1];
    },
    speedReadings(state) {
      return state.locations.map((location) => location.coords.speed || 0);
    },
    currentSpeed(state, getters) {
      return getters.latestLocation.coords.speed || 0;
    },
    averageSpeed(state) {
      let readings = 0;
      let totalSpeed = 0;
      state.locations.forEach((location) => {
        if (location.coords.speed) {
          totalSpeed += location.coords.speed;
          readings += 1;
        }
      });
      return (totalSpeed / readings) || 0;
    },
    currentHeading(state, getters) {
      return getters.latestLocation.coords.heading;
    },
    nearbyConfirmed(state, getters) {
      return sortLocations(state.dataset.confirmed, getters.latestLocation);
    },
    nearbyDeaths(state, getters) {
      return sortLocations(state.dataset.confirmed, getters.latestLocation);
    },
    nearbyRecovered(state, getters) {
      return sortLocations(state.dataset.confirmed, getters.latestLocation);
    },
  },
  actions: {
    fetchDataset({ commit }) {
      return axios.get('https://covid19.belabor.workers.dev/').then((response) => {
        console.log(response.data);
        commit('setItem', { item: 'dataset', value: response.data });
      });
    },
    getUserLocation({ state, commit, dispatch }) {
      if (state.watchId !== null) {
        // console.log('existing watch');
        dispatch('stopWatchingUserLocation');
      }
      const watchId = navigator.geolocation.watchPosition((location) => {
        dispatch('setLocation', location);
      },
      (error) => dispatch('locationError', error),
      {
        enableHighAccuracy: true,
        timeout: 30 * 1000,
      });
      commit('setItem', { item: 'watchId', value: watchId });
    },
    setLocation({ commit, dispatch }, location) {
      if (location.coords.speed !== null) {
        dispatch('setSupportsLocation', true);
      }
      dispatch('setLoading', false);

      commit('addLocation', location);
    },
    locationError({ dispatch }) {
      // console.warn('location access denied', error);
      dispatch('setLoading', false);
      dispatch('setSupportsLocation', false);
    },
    stopWatchingUserLocation({ state, commit }) {
      navigator.geolocation.clearWatch(state.watchId);
      commit('setItem', { item: 'watchId', value: null });
    },
    clearLocations({ commit }) {
      commit('setItem', { item: 'locations', value: [] });
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
    setAd({ commit }, { id, html }) {
      commit('setAd', { id, html });
    },
  },
  mutations: {
    setItem(state, { item, value }) {
      Vue.set(state, item, value);
    },
    setAd(state, { id, html }) {
      Vue.set(state.ezoicAds, id, html);
    },
    addLocation(state, location) {
      if (location.coords.longitude && location.coords.latitude) {
        state.locations.push(location);
      }
    },
  },
});
