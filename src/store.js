import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
    location: {},
    useFeet: true,
    supportsLocation: false,
    watchId: null,
    colorScheme: localStorage.getItem('colorScheme') || 'auto',
  },
  actions: {
    getUserLocation({ commit, dispatch }) {
      const watchId = navigator.geolocation.watchPosition(
        (location) => {
          dispatch('setUserLocation', location);
        },
        error => dispatch('locationError', error),
        {
          enableHighAccuracy: true,
          timeout: 30 * 1000,
        },
      );
      commit('setItem', { item: 'watchId', value: watchId });
    },
    setUserLocation({ dispatch, commit }, location) {
      commit('setItem', { item: 'location', value: location });
      if (location.coords.altitude) {
        dispatch('setSupportsLocation', true);
        dispatch('setLoading', false);
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
    setElevation(state, { elevation, source, accuracy = null }) {
      Vue.set(state.elevation, 'value', elevation);
      Vue.set(state.elevation, 'source', source);
      Vue.set(state.elevation, 'accuracy', accuracy);
    },
  },
});
