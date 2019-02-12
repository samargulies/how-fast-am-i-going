import Vue from 'vue';
import Vuex from 'vuex';
import { getElevation } from '@/bingMaps';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
    setLocationOpen: false,
    location: {},
    elevation: {},
    useFeet: true,
    supportsElevation: false,
  },
  actions: {
    getUserLocation({ dispatch }) {
      navigator.geolocation.getCurrentPosition(
        location => dispatch('setUserLocation', location),
        error => dispatch('locationError', error),
        { enableHighAccuracy: true },
      );
    },
    setUserLocation({ dispatch }, location) {
      console.log({ location });
      dispatch('updateLocation', {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy,
      });
      if (location.coords.altitude) {
        dispatch('updateSupportsElevation', true);
        dispatch('updateElevation', {
          elevation: location.coords.altitude,
          source: 'phone',
        });
      } else {
        dispatch('fetchElevation');
      }
    },
    locationError(error) {
      console.warn('location access denied', error);
      this.$store.commit('setItem', { item: 'loading', value: false });
      this.$store.dispatch('setLocationOpen', true);
    },
    fetchElevation({ state, dispatch }) {
      dispatch('setLoading', true);
      return getElevation({
        latitude: state.location.latitude,
        longitude: state.location.longitude,
      }).then((elevation) => {
        dispatch('updateElevation', { elevation, source: 'web' });
        dispatch('setLoading', false);
        dispatch('setLocationOpen', false);
      }).catch((error) => {
        console.warn(error);
        dispatch('setLocationOpen', true);
      });
    },
    updateLocation({ commit }, {
      latitude, longitude, accuracy = 100, title = '',
    }) {
      commit('setItem', {
        item: 'location',
        value: {
          latitude, longitude, accuracy, title,
        },
      });
    },
    updateElevation({ commit }, { elevation, source }) {
      commit('setElevation', { elevation, source });
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

  },
  mutations: {
    setItem(state, { item, value }) {
      Vue.set(state, item, value);
    },
    setElevation(state, { elevation, source }) {
      Vue.set(state.elevation, 'value', elevation);
      Vue.set(state.elevation, 'source', source);
    },
  },
});
