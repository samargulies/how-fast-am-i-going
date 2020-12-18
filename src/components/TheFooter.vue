<template>
  <!-- eslint-disable max-len -->
  <footer class="footer">
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
        <div class="text-block" v-html="$t('what-is-this.html')"></div>
        <Ezoic id="106" />
      </div>
    </slot>
    <div class="section section--localizations">
      <ul class="languages">
        <li>
          <router-link :to="pathForLocale({locale:'de'})">Deutsch</router-link>
        </li>
        <li>
          <router-link :to="pathForLocale({locale:'es'})">Español</router-link>
        </li>
        <li>
          <router-link :to="pathForLocale({locale:'en'})">English</router-link>
        </li>
        <li>
          <router-link :to="pathForLocale({locale:'fr'})">Français</router-link>
        </li>
        <li>
          <router-link :to="pathForLocale({locale:'it'})">Italiano</router-link>
        </li>
        <li>
          <router-link :to="pathForLocale({locale:'pt'})">Português</router-link>
        </li>
        <li>
          <router-link :to="pathForLocale({locale:'ru'})">Русский</router-link>
        </li>
        <li>
          <router-link :to="pathForLocale({locale:'ja'})">日本語</router-link>
        </li>
        <li>
          <router-link :to="pathForLocale({locale: 'zh'})">中文</router-link>
        </li>
      </ul>
    </div>
    <WhereWhat :fast="false" />
    <div class="app-settings">
      <a
        v-for="colorScheme in colorSchemes"
        :key="colorScheme"
        :class="['setting-button', `setting-button--color-scheme-${colorScheme}`,
        currentColorScheme === colorScheme ? 'active' : '' ]"
        @click="$store.dispatch('setColorScheme', colorScheme);"
      >{{ $t(`color-scheme-${colorScheme}`)}}</a>
    </div>
  </footer>
</template>
<script>
import { pathForLocale } from '@/helpers';
import Ezoic from '@/components/Ezoic.vue';
import WhereWhat from '@/components/WhereWhat.vue';

export default {
  components: { Ezoic, WhereWhat },
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
