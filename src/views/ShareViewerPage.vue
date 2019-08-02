<template>
  <div class="share-page">
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
  created() {

  },
};
</script>
<style lang="scss">
</style>
