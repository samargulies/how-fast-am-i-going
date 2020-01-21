import Vue from 'vue';
import Router from 'vue-router';
import SpeedPage from './views/SpeedPage.vue';
import i18n from '@/i18n';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/en/*',
      redirect: (to) => `/${to.params.pathMatch}`,
    },
    {
      path: '/:lang(\\w{2})?',
      component: {
        template: '<router-view />',
      },
      children: [
        {
          path: '/:page?',
          name: 'home',
          component: SpeedPage,
          props: true,
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
