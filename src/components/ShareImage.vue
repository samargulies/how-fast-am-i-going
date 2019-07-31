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
    <a @click="share" v-if="shareApi">{{ $t('share') }}</a>
    <a @click="saveImage">{{ $t('save-image') }}</a>
  </div>
</div>
</template>
<script>
import VueKonva from 'vue-konva';
import axios from 'axios';

const systemFontFamily = 'system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif';
const clarendonFontFamily = `"clarendon-text-pro", "Superclarendon-Regular", "Rockwell", ${systemFontFamily}`;

export default {
  data() {
    return {
      image: null,
    };
  },
  components: {
    'v-stage': VueKonva.Stage,
    'v-layer': VueKonva.Layer,
    'v-text': VueKonva.Text,
    'v-image': VueKonva.Image,
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
    useFeet() {
      return this.$store.state.useFeet || this.$t('units.feet-default') === 'true';
    },
    elevationFormatted() {
      const formatted = this.$options.filters.numberFormatted(this.elevation, {
        useFeet: this.useFeet,
        locale: this.$t.locale,
      });
      const units = this.$t(this.useFeet ? 'units.feet' : 'units.meters');
      return `${formatted} ${units}`;
    },
    stageConfig() {
      return {
        width: this.width,
        height: this.height,
      };
    },
    imageConfig() {
      console.log('recalc image config', this.image);
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
        fontSize: this.getRelativeSize(54),
        fontFamily: systemFontFamily,
        fill: this.background === 'mapbox/satellite-v9' ? '#DFDFDF' : '#8A8A8A',
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
        fontSize: this.getRelativeSize(114),
        fontFamily: systemFontFamily,
        fill: this.background === 'mapbox/satellite-v9' ? '#fff' : '#000',
      };
    },
    elevationTextConfig() {
      return {
        y: this.height * 0.25,
        width: this.width,
        text: this.elevationFormatted,
        align: 'center',
        fontSize: this.getRelativeSize(467),
        fontFamily: clarendonFontFamily,
        fill: this.background === 'mapbox/satellite-v9' ? '#fff' : '#000',
      };
    },
    siteTitleConfig() {
      return {
        y: this.height * 0.1,
        width: this.width,
        text: this.$t('site-title'),
        align: 'center',
        fontSize: this.getRelativeSize(100),
        fontFamily: systemFontFamily,
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
    getRelativeSize(size) {
      if (this.width < this.height) {
        return size * this.width / 1280;
      }
      return size * this.height / 1280;
    },
    getBackgroundImage() {
      // get the image this way to avoid cross-domain canvas security restrictions
      this.loading = true;
      axios.get(this.mapUrl, {
        responseType: 'blob',
      }).then((response) => {
        const image = new window.Image();
        image.src = window.URL.createObjectURL(response.data);
        image.onload = () => {
          this.image = image;
          this.loading = false;
        };
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
  watch: {
    mapUrl() {
      this.getBackgroundImage();
    },
  },
  created() {
    this.getBackgroundImage();
  },
};
</script>
<style lang="scss">
.share-preview {
    position: sticky;
    top: 0;
    background: #FFFFFF;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.16);
    padding: 1em;
}
.konvajs-content, .konvajs-content canvas {
  width: auto !important;
  height: 25vh !important;
  height: calc(min(30vh, calc(80vw * 9 / 16))) !important;
  position: inherit !important;
}
.konvajs-content canvas {
  margin: 0 auto !important;
  box-shadow: 0 1px 13px #C7C7C7;
}
.share-actions {
  padding: 1em 0 0;
}
</style>
