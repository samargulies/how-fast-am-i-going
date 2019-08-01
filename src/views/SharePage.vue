<template>
  <div class="share-page">
    <ShareImage
      :latitude="latitude"
      :longitude="longitude"
      :title="settings.includeTitle ? settings.title : null"
      :elevation="elevation"
      :background="backgrounds[settings.background].value"
      :zoom="settings.zoom"
      :size="formats[settings.format]" />
    <div class="share-settings">
      <div class="share-setting share-setting--title">
          <h3 class="share-setting__title">Title</h3>
          <div class="share-setting__form">
            <input class="share-setting__input share-setting__input--title" v-model="settings.title" />
            <label class="share-setting__input share-setting__input--include-title" v-if="settings.title">
              <input type="checkbox" v-model="settings.includeTitle"/>
              Show title
            </label>
          </div>
      </div>
      <div class="share-setting share-setting--format">
        <h3 class="share-setting__title">Format</h3>
        <div class="share-setting__form">
          <div :class="['share-setting__option', 'share-setting__option--format',
              format.id === settings.format ? 'share-setting__option--selected' : '']"
            v-for="format in formats"
            :key="format.id">
            <a @click="settings.format = format.id">{{ format.name }}</a>
          </div>
        </div>
      </div>
      <div class="share-setting share-setting--background">
        <h3 class="share-setting__title">Background</h3>
        <div class="share-setting__form">
          <div :class="['share-setting__option', 'share-setting__option--background',
              background.id === settings.background ? 'share-setting__option--selected' : '']"
            v-for="background in backgrounds"
            :key="background.id">
            <a @click="settings.background = background.id">{{ background.name }}</a>
          </div>
        </div>
      </div>
      <div class="share-setting share-setting--zoom">
        <h3 class="share-setting__title">Zoom</h3>
        <div class="share-setting__form">
          <a class="share-setting__option share-setting__option--zoom"
            @click="settings.zoom += 1">Zoom in</a>
          <a class="share-setting__option share-setting__option--zoom"
            @click="settings.zoom -= 1">Zoom out</a>
        </div>
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
        title: parseUrlTitle(this.title),
        includeTitle: true,
      },
    };
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
.share-settings {
  margin: 2rem 0;
}
.share-setting {
  max-width: 20rem;
  margin: 0 auto 1.5rem;

  &__title {
    font-size: 0.75em;
    letter-spacing: 0.7px;
    text-transform: uppercase;
    font-weight: 500;
    text-align: left;
  }
  &--title {
    .share-setting__form {
      flex-direction: column;
    }
    .share-setting__input--title {
      font-size: 1.25rem;
      width: 100%;
      margin-bottom: 0.5em;
    }
    .share-setting__input--include-title {
      text-align: left;
      width: 100%;
    }
  }
  &__form {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  a {
    border: 2px solid #E6DDD4;
    padding: 0.5em;
    margin: 0.25em;
    display: inline-block;
  }
  &__option {
    margin: 0 1em;
    a {
      font-weight: 500;
    }
    &--selected a {
      font-weight: 700;
    }
  }
}
</style>
