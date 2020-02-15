<template>
  <div class="ezoic-ad-container" ref="container">
    <div :id="`ezoic-pub-ad-placeholder-${id}`"></div>
    <span v-html="adGeneratedContent"></span>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    adGeneratedContent() {
      console.log(this.id);
      console.log(this.$store.state.ezoicAds[this.id]);
      return this.$store.state.ezoicAds[this.id];
    },
  },
};
</script>
