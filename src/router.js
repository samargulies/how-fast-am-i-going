import Vue from 'vue';
import Router from 'vue-router';
import ElevationPage from './views/ElevationPage.vue';
import i18n from '@/i18n';

const AtlasPage = () => import('./views/AtlasPage.vue');
const ApiPage = () => import('./views/ApiPage.vue');
const SharePage = () => import('./views/SharePage.vue');

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
          name: 'share',
          component: SharePage,
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

router.afterEach(() => {
  document.title = i18n.t('site-title');
  document.head.querySelector('meta[property="og:title"]')
    .setAttribute('content', i18n.t('site-title'));
  document.head.querySelector('meta[name="description"]')
    .setAttribute('content', i18n.t('site-description'));
  document.head.querySelector('meta[property="og:description"]')
    .setAttribute('content', i18n.t('site-description'));
});

export default router;
