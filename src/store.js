import Vue from 'vue';
import Vuex from 'vuex';
import i18n from '@/i18n';
import { headingFormatted } from './helpers';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
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
      if (state.locations.length < 2) {
        return [0, 0];
      }
      return state.locations.map((location) => location.coords.speed || 0);
    },
    currentSpeed(state, getters) {
      if (!getters.latestLocation) {
        return 0;
      }
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
      if (!getters.latestLocation) {
        return null;
      }
      return getters.latestLocation.coords.heading || null;
    },
    currentHeadingFormatted(state, getters) {
      if (getters.currentHeading === null) {
        return null;
      }
      return headingFormatted(getters.currentHeading);
    },
  },
  actions: {
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
      // delay settings a location error for prerendering purposes
      setTimeout(() => {
        dispatch('setLoading', false);
        dispatch('setSupportsLocation', false);
      }, 150);
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
      // eslint-disable-next-line valid-typeof
      if (typeof location === 'GeolocationPosition' && location.coords.longitude && location.coords.latitude) {
        state.locations.push(location);
      }
    },
  },
});
