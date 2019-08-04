<template>
  <div id="app">
    <router-view :key="$route.path" />
  </div>
</template>
<script>
import '@/assets/css/style.scss';

export default {
  metaInfo() {
    return {
      titleTemplate: titleChunk => (titleChunk ? `${titleChunk} - ${this.$t('site-title')}` : this.$t('site-title')),
      meta: [
        { name: 'description', content: this.$t('site-description') },
        { property: 'og:description', content: this.$t('site-description') },
        { property: 'og:title', content: this.$t('site-title') },
      ],
    };
  },
};
</script>
