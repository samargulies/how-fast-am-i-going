<template>
  <div class="share-page">
    <ShareImage
      :latitude="latitude"
      :longitude="longitude"
      :title="formattedTitle"
      :elevation="elevation"
      :background="backgrounds[settings.background].value"
      :zoom="settings.zoom"
      :size="formats[settings.format]" />
    <div class="share-settings">
      <div class="share-setting share-setting--title">
      </div>
      <div class="share-setting share-setting--format">
      </div>
      <div class="share-setting share-setting--background">
      </div>
      <div class="share-setting share-setting--zoom">
      </div>
    </div>
  </div>
</template>

<script>
import ShareImage from '@/components/ShareImage.vue';
import { parseUrlTitle } from '@/helpers';

export default {
  components: { ShareImage },
  props: {
    title: { type: String },
    latitude: { type: String },
    longitude: { type: String },
    elevation: { type: String },
  },
  data() {
    return {
      formats: {
        square: {
          id: 'square',
          width: 800,
          height: 800,
        },
        landscape: {
          id: 'landscape',
          width: 800,
          height: 450,
        },
        portrait: {
          id: 'portrait',
          width: 450,
          height: 800,
        },
      },
      backgrounds: {
        contour: {
          id: 'contour',
          value: 'samargulies/cjyopg6et4uui1cotgzof2j7n',
        },
        terrain: {
          id: 'terrain',
          value: 'mapbox/outdoors-v11',
        },
        satellite: {
          id: 'satellite',
          value: 'mapbox/satellite-v9',
        },
      },
      settings: {
        format: 'landscape',
        background: 'contour',
        zoom: 14,
      },
    };
  },
  computed: {
    formattedTitle() {
      return parseUrlTitle(this.title);
    },
  },
  methods: {
    share() {

    },
    saveImage() {

    },
  },
  created() {},
};
</script>
<style lang="scss">
</style>
