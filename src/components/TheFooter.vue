<template>
<!-- eslint-disable max-len -->
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
        This site was designed to find your current speed, average speed, and compass direction in miles per hour, kilometers per hour, or knots. To use this online speedometer, visit this page on a GPS enabled device and your speed will update automatically as you move. It will even work when your phone is offline. You can use this to see how fast you are travelling while walking, biking, driving, boating, or on a train.
      </p>
      <p>What is speed? In everyday use and in kinematics, the speed of an object is the magnitude of its velocity (the rate of change of its position); it is thus a scalar quantity. The average speed of an object in an interval of time is the distance travelled by the object divided by the duration of the interval; the instantaneous speed is the limit of the average speed as the duration of the time interval approaches zero.</p>
      <p>To calculate your current or instantaneous speed, you take the distance travelled over a very short period of time. A car travelling at 50 km/h generally goes for less than one hour at a constant speed, but if it did go at that speed for a full hour, it would travel 50 km. If the vehicle continued at that speed for half an hour, it would cover half that distance (25 km). If it continued for only one minute, it would cover about 833 m.</p>
      <p>Different from instantaneous speed, average speed is defined as the total distance covered divided by the time interval. For example, if a distance of 80 kilometres is driven in 1 hour, the average speed is 80 kilometres per hour. Likewise, if 320 kilometres are travelled in 4 hours, the average speed is also 80 kilometres per hour. When a distance in kilometres (km) is divided by a time in hours (h), the result is in kilometres per hour (km/h).</p>
      <p>Average speed does not describe the speed variations that may have taken place during shorter time intervals (as it is the entire distance covered divided by the total time of travel), and so average speed is often quite different from a value of instantaneous speed.</p>
      <p>Miles per hour is an imperial and United States customary unit of speed expressing the number of statute miles covered in one hour. It is used in the United States, United Kingdom and some Commonwealth nations, notably in the Caribbean region.</p>
      <p>Kilometers (or Kilometres) per hour: internationally, km/h is the most commonly used unit of speed on traffic signs and speedometers. Other abbreviations include "km/h", "kmph" and "km/hr" as English abbreviations.</p>
      <p>Knots: The knot is a unit of speed equal to one nautical mile per hour, exactly 1.852 km/h (approximately 1.15078 mph). The ISO standard symbol for the knot is kn, though kt is also common, especially in aviation. Worldwide, the knot is used in meteorology, and in maritime and air navigation—for example, a vessel travelling at 1 knot along a meridian travels approximately one minute of geographic latitude in one hour.</p>

    <p>Etymologically, the term derives from counting the number of knots in the line that unspooled from the reel of a chip log in a specific time.</p>
      <i18n path="brought-to-you-by" tag="p">
        <a href="https://belabor.org/">belabor.org</a>
      </i18n>
    </div>
  </div>
  <div class="section section--navigation">
    <nav>
      <ul>
        <li><router-link :to="pathForLocale({path: '/'})">Home</router-link></li>
        <li><a href="https://www.whatismyelevation.com/">What is my elevation?</a></li>
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
