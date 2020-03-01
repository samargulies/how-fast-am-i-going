<template>
<!-- eslint-disable max-len -->
<footer class="footer">
  <div class="section section--localizations">
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
  </div>
  <!-- Ezoic - Below Localizations - long_content -->
  <Ezoic id="105" />
  <!-- End Ezoic - Below Localizations - long_content -->
  <slot>
    <div class="section section--about" v-if="page">
      <h2 class="section__title">{{ $t(`page.${page}.heading`) }}</h2>
      <div class="text-block">
        <p>{{ $t(`page.${page}.text`)}}</p>
      </div>
    </div>
    <div class="section section--about" v-else-if="includeAbout">
      <h2 class="section__title">{{ $t('what-is-this.heading') }}</h2>
      <div class="text-block">
        <p>{{ $t('what-is-this.p1') }}</p>
        <h3>{{ $t('how-we-calc-speed.heading') }}</h3>
        <p>{{ $t('how-we-calc-speed.p1') }}</p>
        <!-- Ezoic - Below Description Paragraph 1 - longer_content -->
        <Ezoic id="106" />
        <!-- End Ezoic - Below Description Paragraph 1 - longer_content -->
        <h3>{{ $t('graph-speed.heading') }}</h3>
        <p>{{ $t('graph-speed.p1') }}</p>
        <h3>{{ $t('suggested-uses.heading') }}</h3>
        <p>{{ $t('suggested-uses.p1') }}</p>
        <p>{{ $t('suggested-uses.p2') }}</p>
        <p>{{ $t('suggested-uses.p3') }}</p>
        <p>{{ $t('suggested-uses.p4') }}</p>
        <p>{{ $t('suggested-uses.p5') }}</p>
        <p>{{ $t('suggested-uses.p6') }}</p>
        <p>{{ $t('suggested-uses.p7') }}</p>
        <h3>{{ $t('current-speed.heading') }}</h3>
        <p>{{ $t('current-speed.p1') }}</p>
        <h3>{{ $t('avg-speed.heading') }}</h3>
        <p>{{ $t('avg-speed.p1') }}</p>
        <p>{{ $t('avg-speed.p2') }}</p>
        <h3>{{ $t('supported-speed.heading') }}</h3>
        <p>{{ $t('supported-speed.p1') }}</p>
        <p>{{ $t('supported-speed.p2') }}</p>
        <i18n path="brought-to-you-by" tag="p">
          <a href="https://belabor.org/">belabor.org</a>
        </i18n>
      </div>
    </div>
  </slot>
  <div class="section section--navigation">
    <nav>
      <ul>
        <li><router-link :to="pathForLocale({path: '/'})">{{ $t('home') }}</router-link></li>
        <li><a href="https://www.whatismyelevation.com/">{{ $t('what-is-my-elevation') }}</a></li>
        <li><a href="https://snowfall.guide/">{{ $t('snowfall-guide') }}</a></li>
        <li><a href="http://visited.earth/">{{ $t('visited-earth') }}</a></li>
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
import Ezoic from '@/components/Ezoic.vue';

export default {
  components: { Ezoic },
  props: {
    page: {
      type: String,
    },
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
  },
  methods: {
    pathForLocale,
  },
};
</script>
