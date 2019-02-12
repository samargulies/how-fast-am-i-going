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
    <li><router-link :to="pathForLocale('de')">Deutsch</router-link></li>
    <li><router-link :to="pathForLocale('es')">Español</router-link></li>
    <li><router-link :to="pathForLocale('en')">English</router-link></li>
    <li><router-link :to="pathForLocale('fr')">Français</router-link></li>
    <li><router-link :to="pathForLocale('it')">Italiano</router-link></li>
    <li><router-link :to="pathForLocale('pt')">Português</router-link></li>
    <li><router-link :to="pathForLocale('ru')">Русский</router-link></li>
    <li><router-link :to="pathForLocale('ja')">日本語</router-link></li>
    <li><router-link :to="pathForLocale('zh')">中文</router-link></li>
  </ul>

  <div class="altimeter-section" v-if="showAltimeters">
    <h2>Looking for a dedicated device?</h2>
    <p class="subheading">Here are some recommended altimeters</p>

    <div class="altimeters">

      <div class="altimeter">
        <a rel="noreferrer" href="https://itunes.apple.com/us/app/pro-altimeter-barometric-altimeter-manual-gps-metar/id926603602?mt=8&at=1000lHxD">
          <h3>Pro Altimeter for iOS</h3>
          <p>Get barometric altitude and GPS altitude with easy calibration</p>
          <p class="altimeter__price">$0.99</p>
        </a>
      </div>

      <div class="altimeter">
        <a rel="noreferrer" href="https://www.amazon.com/gp/product/B004SHUT66/?tag=shyboyz-20">
          <h3>Suunto Core</h3>
          <p>Well-built barometric altimeter watch</p>
          <p class="altimeter__price">$169</p>
        </a>
      </div>

      <div class="altimeter">
        <a rel="noreferrer" href="https://www.amazon.com/gp/product/B01N7J9APR/ref=as_li_tl?ie=UTF8&tag=shyboyz-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=B01N7J9APR&linkId=71805d6214f24437b38cf435d2aef36e">
          <h3>Garmin Fenix</h3>
          <p>Advanced fitness watch with GPS, heart-rate monitoring, compass, and barometric altimeter</p>
          <p class="altimeter__price">$557</p>
        </a>
      </div>

      <div class="altimeter hidden">
        <a rel="noreferrer" href="https://itunes.apple.com/us/app/gaia-gps-hiking-hunting-maps/id1201979492?mt=8&at=1000lHxD">
          <h3>Gaia GPS</h3>
          <p>Offline hiking/elevation maps and tracking of your phone's altimeter</p>
          <p class="altimeter__price">Free with $10/year membership</p>
        </a>
      </div>

      <div class="altimeter hidden">
        <a rel="noreferrer" href="https://www.amazon.com/ZIPLEVEL-PRO-2000B-Precision-Altimeter-75-Feet/dp/B000225Q1Y/ref=as_li_ss_tl?_encoding=UTF8&psc=1&refRID=NKJAJAJXWNBQRAG1EJ8Y&linkCode=ll1&tag=belabororg0c-20&linkId=a9903065239cd4669599bd8eb37fce8d">
          <h3>ZipLevel Pro</h3>
          <p>Industrial alternative to self leveling laser elevation equipment with high precision</p>
          <p class="altimeter__price">$699</p>
        </a>
      </div>
    </div>
  </div>
  <div class="section section--about">
    <h2 class="section__title">What is this?</h2>
    <!-- eslint-disable-next-line max-len -->
    <p>I built snowfall guide because I always wonder what the actual snow totals are near me after a snow storm. I hope you enjoy viewing the snow accumulation, snow depth, and snowfall for your recent winter storms.</p>
    <p><a href="https://darksky.net/poweredby/">Powered by Dark Sky</a> and the <a href="https://www.nohrsc.noaa.gov">National Weather Service NOHRSC</a>.</p>
    <p>Brought to you by <a href="https://belabor.org">belabor.org</a>.</p>
  </div>
  <div class="section section--navigation">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/atlas">Atlas</router-link></li>
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
    pathForLocale(locale) {
      return this.$route.path.replace(/^\/(\w{2}\/)*/, `/${locale}/`);
    },
  },
};
</script>
