<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import '@/assets/css/style.scss';
import { mapState } from 'vuex';

export default {
  metaInfo() {
    return {
      titleTemplate: titleChunk => (titleChunk ? `${titleChunk} - ${this.$t('site-title')}` : this.$t('site-title')),
      meta: [
        { name: 'description', content: this.$t('site-description') },
        { property: 'og:description', content: this.$t('site-description') },
        { property: 'og:title', content: this.$t('site-title') },
      ],
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
      bodyAttrs: {
        class: [`color-scheme--${this.colorScheme}`],
      },
    };
  },
  computed: {
    ...mapState(['colorScheme']),
  },
};
</script>
