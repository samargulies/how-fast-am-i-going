<template>
  <div class="share-preview">
    <v-stage :config="stageConfig" class="share-canvas" ref="stage">
      <v-layer>
        <v-image :config="imageConfig" />
        <v-text :config="siteTitleConfig" />
        <v-text :config="elevationTextConfig" />
        <v-text :config="locationTextConfig" />
        <v-text :config="sourceTextConfig" />
      </v-layer>
    </v-stage>
  <div class="share-actions">
    <a @click="share" v-if="shareApi">Share</a>
    <a @click="saveImage">Save Image</a>
  </div>
</div>
</template>
<script>
import VueKonva from 'vue-konva';

export default {
  components: {
    'v-stage': VueKonva.Stage,
    'v-layer': VueKonva.Layer,
    'v-text': VueKonva.Layer,
    'v-image': VueKonva.Layer,
  },
  props: {
    latitude: { type: String },
    longitude: { type: String },
    title: { type: String },
    elevation: { type: String },
    background: { type: String },
    size: { type: Object },
    zoom: { type: Number },
  },
  computed: {
    shareApi() {
      return typeof navigator.share !== 'undefined';
    },
    width() {
      return this.size.width;
    },
    height() {
      return this.size.height;
    },
    mapUrl() {
      const accessToken = process.env.VUE_APP_MAPBOX_TOKEN;
      return `https://api.mapbox.com/styles/v1/${this.background}/static/${this.longitude},${this.latitude},${this.zoom},0,0/${this.width}x${this.height}@2x?access_token=${accessToken}&logo=false`;
    },
    image() {
      const image = new window.Image();
      image.src = this.mapUrl;
      console.log(this.mapUrl);
      return image;
    },
    elevationFormatted() {
      return this.elevation;
    },
    stageConfig() {
      return {
        width: this.width,
        height: this.height,
      };
    },
    imageConfig() {
      return {
        width: this.width,
        height: this.height,
        image: this.image,
      };
    },
    sourceTextConfig() {
      return {
        y: this.height * 0.94,
        width: this.width,
        text: 'whatismyelevation.com',
        align: 'center',
        fontSize: 19,
        fontFamily: 'system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        fill: '#8A8A8A',
        letterSpacing: 1.6,
      };
    },
    locationTextConfig() {
      return {
        y: this.height * 0.45,
        width: this.width,
        padding: this.width * 0.1,
        text: this.title,
        align: 'center',
        fontSize: 40,
        fontFamily: 'system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        fill: '#000',
      };
    },
    elevationTextConfig() {
      return {
        y: this.height * 0.25,
        width: this.width,
        text: this.elevationFormatted,
        align: 'center',
        fontSize: 164,
        fontFamily: '"clarendon-text-pro", "Superclarendon-Regular", "Rockwell", system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        fill: '#000',
      };
    },
    siteTitleConfig() {
      return {
        y: this.height * 0.1,
        width: this.width,
        text: this.$t('site-title'),
        align: 'center',
        fontSize: 35,
        fontFamily: 'system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        fontStyle: 'bold',
        fill: '#FC7A24',
      };
    },
    dataUrl() {
      return this.$refs.stage.getStage().toDataURL();
    },
  },
  methods: {
    share() {
      if (typeof navigator.share === 'undefined') {
        return;
      }
      navigator.share({
        title: this.$t('site-title'),
        text: this.elevationFormatted,
        url: this.dataUrl,
      });
    },
    saveImage() {
      const link = document.createElement('a');
      link.download = 'my-elevation.png';
      link.href = this.dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>
<style lang="scss">
.share-canvas {
  width: 100%;
  border: 10px solid #eee;
}
</style>
