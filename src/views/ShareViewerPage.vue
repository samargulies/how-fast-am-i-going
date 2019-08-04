<template>
  <div class="share-page">
    <img class="share-image" :src="imageUrl" />
    <TheFooter :includeAbout="false" />
  </div>
</template>

<script>
import TheFooter from '@/components/TheFooter.vue';

export default {
  components: { TheFooter },
  props: {
    id: { type: String },
  },
  data() {
    return {
      settings: null,
    };
  },
  metaInfo() {
    return {
      meta: [
        { property: 'og:image', content: this.imageUrl },
        { property: 'twitter:image', content: this.imageUrl },
      ],
    };
  },
  computed: {
    imageUrl() {
      const bucket = process.env.VUE_APP_AWS_BUCKET;
      return `https://${bucket}.s3.amazonaws.com/${this.id}.png`;
    },
  },
};
</script>
<style lang="scss">
.share-image {
  max-width: 100%;
}
</style>
