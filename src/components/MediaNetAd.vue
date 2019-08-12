<template>
  <div class="ad" :id="id">
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  },
  mounted() {
    // eslint-disable-next-line
    try { window._mNHandle.queue.push(() => { window._mNDetails.loadTag(this.id, this.size, this.id); }); } catch (error) {}
  },
};
</script>
