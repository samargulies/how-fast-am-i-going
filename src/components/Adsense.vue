<template>
  <ins class="adsbygoogle"
    :data-ad-client="adClient"
    :data-ad-slot="adSlot"
    :data-ad-format="adFormat"
    :style="adStyle"></ins>
</template>

<script>
export default {
  props: {
    adClient: {
      type: String,
      required: true,
    },
    adSlot: {
      type: String,
      required: true,
    },
    adFormat: {
      type: String,
      default: 'auto',
    },
    adStyle: {
      type: String,
      default: 'display: block',
    },
  },
  mounted() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  },
};
</script>
