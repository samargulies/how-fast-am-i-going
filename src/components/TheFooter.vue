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
      <h3>How we Calculate your Speed</h3>
      <p>We use the speed reading reported by your device GPS. This site may not work reliably on desktop computers without a GPS sensor or if you do not allow this site to access your current location.</p>
      <h3>Graph your Speed</h3>
      <p>As the website gathers speed readings, we display a graph showing the change in your speed over time. You can click the reset button at any time to clear this graph and the average speed calculation and restart from 0.</p>
      <h3>Suggested Uses</h3>
      <p>Let's suppose you're in an Uber, Lyft or other rideshare vehicle. The question pops into your mind: "How fast is this vehicle going?" It could be a Ford, a BMW, a Subaru, a Toyota or any other of the various cars that comply with Uber and Lyft's standards. Maybe you are going at a snail's pace because of extreme traffic on I-95, or perhaps your driver is going extremely fast and you want to report them but fear looking at their speedometer. Fear not! How Fast Am I Going is here to help you find out.</p>
      <p>What if you're on a leisurely bicycle ride? You are going at a slow pace along the lake so you can see the sunset, but all of a sudden the grey skies show their ugly face and the rain and thunder begins to pour down. You rush home and want to find out just how fast you were going. Simply open up your browser and find out as you rush home to dryness and warmth!</p>
      <p>Another great way to use How Fast Am I Going is if you are in a motorboat.</p>
      <p>An Amtrak train ride from Philadelphia to Indianapolis is a great way to spend 25 hours. The scenic pastoral countryside that North America's Midwest offers is unparalleled. But what if you are admiring the trees, the dirt and the other natural offerings and get a hankering to find out how fast the train is going? Before How Fast Am I Going, you'd have to get up and ask the conductor, who would typically get very angry. Now you can simply open up your smartphone, get online and find out how fast the train is going!</p>
      <p>Vroom Vroom! Your Honda 5 HP (15") Shaft Gas Powered Outboard Motor is speeding you across the local lake so that you can fish for trout, halibut and other fishes. You are clutching your fishing pole, ready to catch whichever fish will take the bait, but you want to know how long it will take to get to the fishing hole. You know there's one about 2 miles away. If you check your speed online, you can determine how long it will take you to get to there. Once caught, you can consume the fish raw or salt it and smoke it.</p>
      <h3>Current Speed</h3>
      <p>To calculate your current or instantaneous speed, you take the distance travelled over a very short period of time. A car travelling at 50 km/h generally goes for less than one hour at a constant speed, but if it did go at that speed for a full hour, it would travel 50 km. If the vehicle continued at that speed for half an hour, it would cover half that distance (25 km).</p>
      <h3>Average Speed</h3>
      <p>Different from instantaneous speed, average speed is defined as the total distance covered divided by the time interval. For example, if a distance of 80 kilometres is driven in 1 hour, the average speed is 80 kilometres per hour. Likewise, if 320 kilometres are travelled in 4 hours, the average speed is also 80 kilometres per hour. When a distance in kilometres (km) is divided by a time in hours (h), the result is in kilometres per hour (km/h).</p>
      <p>Miles per hour is an imperial and United States customary unit of speed expressing the number of statute miles covered in one hour. It is used in the United States, United Kingdom and some Commonwealth nations, notably in the Caribbean region.</p>
      <h3>Supported Speed Units</h3>
      <p>Kilometers (or Kilometres) per hour: internationally, km/h is the most commonly used unit of speed on traffic signs and speedometers. Other abbreviations include "km/h", "kmph" and "km/hr" as English abbreviations.</p>
      <p>Knots: The knot is a unit of speed equal to one nautical mile per hour, exactly 1.852 km/h (approximately 1.15078 mph). Worldwide, the knot is used in meteorology, and in maritime and air navigation—for example, a vessel travelling at 1 knot along a meridian travels approximately one minute of geographic latitude in one hour.</p>
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
