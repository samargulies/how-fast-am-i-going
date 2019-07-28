<template>
  <div class="ad">
    <ins class="adsbygoogle"
      :style="adStyle"
      :data-ad-client="adClient"
      :data-ad-slot="adSlot"
      :data-ad-format="adFormat"
      data-full-width-responsive="true"></ins>
  </div>
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
