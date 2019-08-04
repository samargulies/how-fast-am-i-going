<template>
  <div class="page page--share">
    <ShareImage
      :latitude="latitude"
      :longitude="longitude"
      :title="settings.includeTitle ? settings.title : null"
      :elevation="elevation"
      :background="backgrounds[settings.background].value"
      :zoom="settings.zoom"
      :size="formats[settings.format]"
      :useFeet="settings.useFeet" />
    <div class="share-settings">
      <div class="share-setting share-setting--title">
          <h3 class="share-setting__title">{{ $t('title') }}</h3>
          <div class="share-setting__form">
            <input v-model="settings.title"
              class="share-setting__input share-setting__input--title"/>
            <label v-if="settings.title"
              class="share-setting__input share-setting__input--include-title">
              <input type="checkbox" v-model="settings.includeTitle"/>
              {{ $t('show-title') }}
            </label>
          </div>
      </div>
      <div class="share-setting share-setting--format">
        <h3 class="share-setting__title">{{ $t('format') }}</h3>
        <div class="share-setting__form">
          <div :class="['share-setting__option', 'share-setting__option--format',
              format.id === settings.format ? 'share-setting__option--selected' : '']"
            v-for="format in formats"
            :key="format.id">
            <a @click="settings.format = format.id">{{ $t(format.id) }}</a>
          </div>
        </div>
      </div>
      <div class="share-setting share-setting--background">
        <h3 class="share-setting__title">{{ $t('background') }}</h3>
        <div class="share-setting__form">
          <div :class="['share-setting__option', 'share-setting__option--background',
              background.id === settings.background ? 'share-setting__option--selected' : '']"
            v-for="background in backgrounds"
            :key="background.id">
            <a @click="settings.background = background.id">{{ $t(background.id)  }}</a>
          </div>
        </div>
      </div>
      <div class="share-setting share-setting--zoom">
        <h3 class="share-setting__title">{{ $t('zoom') }}</h3>
        <div class="share-setting__form">
          <a class="share-setting__option share-setting__option--zoom"
            @click="settings.zoom += 1">{{ $t('zoom-in') }}</a>
          <a class="share-setting__option share-setting__option--zoom"
            @click="settings.zoom -= 1">{{ $t('zoom-out') }}</a>
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
  metaInfo() {
    return {
      title: this.$t('share'),
    };
  },
  data() {
    return {
      formats: {
        square: {
          id: 'square',
          width: 1280,
          height: 1280,
        },
        landscape: {
          id: 'landscape',
          width: 1280,
          height: 672,
        },
        portrait: {
          id: 'portrait',
          width: 720,
          height: 1280,
        },
      },
      backgrounds: {
        terrain: {
          id: 'terrain',
          value: 'samargulies/cjyopg6et4uui1cotgzof2j7n',
        },
        street: {
          id: 'street',
          value: 'mapbox/outdoors-v11',
        },
        satellite: {
          id: 'satellite',
          value: 'mapbox/satellite-v9',
        },
      },
      settings: {
        format: this.$route.query.format || 'landscape',
        background: this.$route.query.background || 'terrain',
        zoom: parseFloat(this.$route.query.zoom) || 14,
        title: parseUrlTitle(this.title),
        includeTitle: this.$route.query.includeTitle || true,
        useFeet: this.$store.state.useFeet || this.$t('units.feet-default') === 'true',
      },
    };
  },
  watch: {
    settings: {
      handler({
        format, background, zoom, includeTitle, useFeet,
      }) {
        this.$router.replace({
          query: {
            format,
            background,
            zoom,
            includeTitle,
            useFeet,
          },
        });
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style lang="scss">
.share-settings {
  margin: 2rem 0;
}
.share-setting {
  max-width: 23rem;
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
