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
        <h3 class="share-setting__title">Format</h3>
        <div class="format" v-for="format in formats" :key="format.id">
          <a @click="settings.format = format.id">{{ format.name }}</a>
        </div>
      </div>
      <div class="share-setting share-setting--background">
        <h3 class="share-setting__title">Background</h3>
        <div class="background" v-for="background in backgrounds" :key="background.id">
          <a @click="settings.background = background.id">{{ background.name }}</a>
        </div>
      </div>
      <div class="share-setting share-setting--zoom">
        <h3 class="share-setting__title">Zoom</h3>
        <a @click="settings.zoom += 1">Zoom in</a>
        <a @click="settings.zoom -= 1">Zoom out</a>
      </div>
    </div>
    <TheFooter :includeAbout="false" />
  </div>
</template>

<script>
import ShareImage from '@/components/ShareImage.vue';
import TheFooter from '@/components/TheFooter.vue';
import { parseUrlTitle } from '@/helpers';

export default {
  components: { ShareImage, TheFooter },
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
          name: 'Square',
          width: 1280,
          height: 1280,
        },
        landscape: {
          id: 'landscape',
          name: 'Landscape',
          width: 1280,
          height: 720,
        },
        portrait: {
          id: 'portrait',
          name: 'Portrait',
          width: 720,
          height: 1280,
        },
      },
      backgrounds: {
        terrain: {
          id: 'terrain',
          name: 'Terrain',
          value: 'samargulies/cjyopg6et4uui1cotgzof2j7n',
        },
        street: {
          id: 'street',
          name: 'Street',
          value: 'mapbox/outdoors-v11',
        },
        satellite: {
          id: 'satellite',
          name: 'Satellite',
          value: 'mapbox/satellite-v9',
        },
      },
      settings: {
        format: 'landscape',
        background: 'terrain',
        zoom: 14,
        includeTitle: true,
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
