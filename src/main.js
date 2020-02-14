import Vue from 'vue';
import VueMeta from 'vue-meta';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import i18n from './i18n';
import './filters';

Vue.use(VueMeta);

Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
  mounted: () => document.dispatchEvent(new Event('x-app-rendered')),
}).$mount('#app');

if (process.env.NODE_ENV !== 'production') {
  window.$vm = app;
}
