<template>
  <div class="footer">
    <div class="section altimeter-section">
    <!-- <h2>{{ $t('sponsored-by') }}</h2> -->
    <p class="subheading"></p>

    <div class="altimeters altimeters--sponsored">

        <div class="ad">
          <Adsense
            ad-client="ca-pub-6102117487539042"
            ad-slot="1948746426" />
        </div>

    </div>
  </div>

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

  <div class="section section--about" v-if="includeAbout">
    <h2 class="section__title">What is this?</h2>
    <div class="text-block">
      <p>
        This site was designed to help you find the elevation of your current location,
        or any point on Earth.
        When viewed from a phone that supports elevation readings,
        the reading will come directly from your device altitude reading and will update
        automatically as you move. It will even work when your phone is offline.
        From a computer your elevation is loaded from our API based on your location.
      </p>
      <p v-if="enableCustomApi">
        <router-link :to="pathForLocale({path: '/api'})">
          Powered by the What is My Elevation API
        </router-link>
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
        <li><router-link :to="pathForLocale({path: '/atlas'})">Atlas</router-link></li>
        <li v-if="enableCustomApi">
          <router-link :to="pathForLocale({path: '/api'})">API</router-link>
        </li>
        <li><a href="https://snowfall.guide/">Snowfall Guide</a></li>
        <li><a href="http://visited.earth/">Visited Earth</a></li>
      </ul>
    </nav>
  </div>

</div>
</template>
<script>
import Adsense from '@/components/Adsense.vue';
import config from '@/config';

export default {
  components: { Adsense },
  props: {
    includeAbout: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    enableCustomApi() {
      return config.ENABLE_CUSTOM_API;
    },
    showAltimeters() {
      return !this.$t('hide-altimeters');
    },
  },
  methods: {
    pathForLocale({ path = this.$route.path, locale = this.$i18n.locale }) {
      return path.replace(/^\/(\w{2}\/)*/, `/${locale}/`);
    },
  },
};
</script>
