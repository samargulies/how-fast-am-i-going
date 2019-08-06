import Vue from 'vue';
import Vuex from 'vuex';

import bingApi from '@/bingMaps';
import customApi from '@/api';

import config from '@/config';
import { round } from '@/helpers';

const api = config.ENABLE_CUSTOM_API ? customApi : bingApi;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
    setLocationOpen: false,
    location: {},
    elevation: {},
    useFeet: true,
    supportsElevation: false,
    watchId: null,
    colorScheme: localStorage.getItem('colorScheme') || 'auto',
  },
  actions: {
    getUserLocation({ state, commit, dispatch }) {
      const watchId = navigator.geolocation.watchPosition(
        (location) => {
          // only update location if the watch is still active
          if (state.watchId) {
            dispatch('setUserLocation', location);
          }
        },
        error => dispatch('locationError', error),
        {
          enableHighAccuracy: true,
          timeout: 30 * 1000,
        },
      );
      commit('setItem', { item: 'watchId', value: watchId });
    },
    setUserLocation({ state, dispatch, commit }, location) {
      const previousLocation = state.location;
      dispatch('updateLocation', {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy,
      });
      if (location.coords.altitude) {
        dispatch('setSupportsElevation', true);
        commit('setElevation', {
          elevation: location.coords.altitude,
          source: 'phone',
          accuracy: location.coords.altitudeAccuracy,
        });
        dispatch('setLoading', false);
      } else if (state.location.latitude !== previousLocation.latitude
        || state.location.longitude !== previousLocation.longitude) {
        dispatch('fetchElevation');
      }
    },
    locationError({ commit, dispatch }, error) {
      console.warn('location access denied', error);
      commit('setItem', { item: 'loading', value: false });
      dispatch('setLocationOpen', true);
    },
    stopWatchingUserLocation({ state, commit }) {
      navigator.geolocation.clearWatch(state.watchId);
      commit('setItem', { item: 'watchId', value: null });
    },
    fetchElevation({ state, dispatch, commit }) {
      if (!navigator.onLine) {
        console.log('offline, not fetching elevation');
        return false;
      }
      dispatch('stopWatchingUserLocation');
      let loaded = false;
      // delay showing the loading animation in case the response is super fast
      setTimeout(() => {
        if (!loaded) {
          dispatch('setLoading', true);
        }
      }, 200);
      return api.getElevation({
        latitude: round(state.location.latitude, 5),
        longitude: round(state.location.longitude, 5),
      }).then((elevation) => {
        loaded = true;
        commit('setElevation', { elevation, source: 'web' });
        dispatch('setLoading', false);
      }).catch((error) => {
        console.warn(error);
        dispatch('setLocationOpen', true);
      });
    },
    updateLocation({ commit }, {
      latitude, longitude, accuracy = 100, title = null,
    }) {
      commit('setItem', {
        item: 'location',
        value: {
          latitude, longitude, accuracy, title,
        },
      });
    },
    setLocationOpen({ commit }, isOpen) {
      commit('setItem', { item: 'setLocationOpen', value: isOpen });
    },
    setLoading({ commit }, isLoading) {
      commit('setItem', { item: 'loading', value: isLoading });
    },
    setUseFeet({ commit }, isFeet) {
      commit('setItem', { item: 'useFeet', value: isFeet });
    },
    setSupportsElevation({ commit }, supportsElevation) {
      commit('setItem', { item: 'supportsElevation', value: supportsElevation });
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
    setElevation(state, { elevation, source, accuracy = null }) {
      Vue.set(state.elevation, 'value', elevation);
      Vue.set(state.elevation, 'source', source);
      Vue.set(state.elevation, 'accuracy', accuracy);
    },
  },
});
