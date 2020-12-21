import Vue from 'vue';
import VueMeta from 'vue-meta';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import i18n from './i18n';

Vue.use(VueMeta);

Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
  beforeMount: () => {
    document.querySelectorAll('.ezoic-ad.adtester-container')
      .forEach((ad) => {
        const id = [...ad.classList].find((c) => c.includes('adtester-container-')).replace('adtester-container-', '');
        store.dispatch('setAd', { id, html: ad.innerHTML });
      });
  },
  mounted: () => document.dispatchEvent(new Event('x-app-rendered')),
}).$mount('#app');

if (process.env.NODE_ENV !== 'production') {
  window.$vm = app;
}
