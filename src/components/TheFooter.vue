<template>
<footer class="footer">
  <!-- <div class="section section--localizations">
    <ul class="languages">
      <li><router-link :to="pathForLocale({locale:'de'})">Deutsch</router-link></li>
      <li><router-link :to="pathForLocale({locale:'es'})">Español</router-link></li>
      <li><router-link :to="pathForLocale({locale:'en'})">English</router-link></li>
      <li><router-link :to="pathForLocale({locale:'fr'})">Français</router-link></li>
      <li><router-link :to="pathForLocale({locale:'it'})">Italiano</router-link></li>
      <li><router-link :to="pathForLocale({locale:'pt'})">Português</router-link></li>
      <li><router-link :to="pathForLocale({locale:'ru'})">Русский</router-link></li>
      <li><router-link :to="pathForLocale({locale:'ja'})">日本語</router-link></li>
      <li><router-link :to="pathForLocale({locale: 'zh'})">中文</router-link></li>
    </ul>
  </div> -->

  <div class="section section--about" v-if="includeAbout">
    <h2 class="section__title">What is this?</h2>
    <div class="text-block">
      <p>
        Find your current speed, average speed, and compass direction in mph or km/h with
        this online speedometer.
      </p>
      <i18n path="brought-to-you-by" tag="p">
        <a href="https://belabor.org/">belabor.org</a>
      </i18n>
    </div>
  </div>
  <div class="section section--navigation">
    <nav>
      <ul>
        <li><router-link :to="pathForLocale({path: '/'})">Home</router-link></li>
        <li><a href="https://www.whatismyelevation.com/">What is My Elevation?</a></li>
        <li><a href="https://snowfall.guide/">Snowfall Guide</a></li>
        <li><a href="http://visited.earth/">Visited Earth</a></li>
      </ul>
    </nav>
  </div>
  <div class="app-settings">
    <a v-for="colorScheme in colorSchemes"
      :key="colorScheme"
      :class="['setting-button', `setting-button--color-scheme-${colorScheme}`,
        currentColorScheme === colorScheme ? 'active' : '' ]"
      @click="$store.dispatch('setColorScheme', colorScheme);">
      {{ $t(`color-scheme-${colorScheme}`)}}
    </a>
  </div>
</footer>
</template>
<script>
import { pathForLocale } from '@/helpers';

export default {
  props: {
    includeAbout: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    colorSchemes() {
      return ['light', 'dark', 'auto'];
    },
    currentColorScheme() {
      return this.$store.state.colorScheme;
    },
    showAltimeters() {
      return !this.$t('hide-altimeters');
    },
  },
  methods: {
    pathForLocale,
  },
};
</script>
