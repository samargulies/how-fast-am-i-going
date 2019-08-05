import Vue from 'vue';
import Router from 'vue-router';
import ElevationPage from './views/ElevationPage.vue';
import i18n from '@/i18n';

const AtlasPage = () => import('./views/AtlasPage.vue');
const ApiPage = () => import('./views/ApiPage.vue');
const ShareCustomizerPage = () => import('./views/ShareCustomizerPage.vue');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/en/*',
      redirect: to => `/${to.params.pathMatch}`,
    },
    {
      path: '/lang/:lang.html',
      redirect: to => `/${to.params.lang}/`,
    },
    {
      path: '/:lang(\\w{2})?',
      component: {
        template: '<router-view />',
      },
      children: [
        {
          path: '',
          name: 'home',
          component: ElevationPage,
        },
        {
          path: 'location/:latitude,:longitude/:title?/:elevation/share',
          name: 'ShareCustomizer',
          component: ShareCustomizerPage,
          props: true,
        },
        {
          path: 'location/:latitude,:longitude/:title?',
          name: 'location',
          component: ElevationPage,
          props: true,
        },
        {
          path: 'atlas',
          name: 'atlas',
          component: AtlasPage,
        },
        {
          path: 'api',
          name: 'api',
          component: ApiPage,
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.name === from.name) {
      return false;
    }
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const lang = to.params.lang || process.env.VUE_APP_I18N_LOCALE;
  i18n.locale = lang;
  next();
});

export default router;
