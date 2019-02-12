<template>
  <div class="footer">
    <div class="altimeter-section">
    <h2 data-t="sponsored-by">{{ $t('sponsored-by') }}</h2>
    <p class="subheading"></p>

    <div class="altimeters altimeters--sponsored">

        <div class="ad">
          <Adsense
            ad-client="ca-pub-6102117487539042"
            ad-slot="1948746426" />
        </div>


        <div class="altimeter altimeter--full-width">
          <a href="https://www.happiercats.com/">
            <h3>Happier Cats</h3>
            <p>Better toys for happier cats</p>
            <p class="altimeter__price">Realistic fish cat toys from $4.99</p>
          </a>
        </div>

    </div>

  </div>

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

  <div class="section section--about">
    <h2 class="section__title">What is this?</h2>
    <!-- eslint-disable-next-line max-len -->
    <p>Find the elevation of your current location, or any point on Earth.</p>
    <p>Brought to you by <a href="https://belabor.org">belabor.org</a>.</p>
  </div>
  <div class="section section--navigation">
    <nav>
      <ul>
        <li><router-link :to="{name: 'home'}">Home</router-link></li>
        <li><router-link :to="{name: 'atlas'}">Atlas</router-link></li>
      </ul>
    </nav>
  </div>

</div>
</template>
<script>
import Adsense from '@/components/Adsense.vue';

export default {
  components: { Adsense },
  computed: {
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
