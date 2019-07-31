import Vue from 'vue';
import { round, metersToFeet } from '@/helpers';

Vue.filter('numberFormatted', (number, { useFeet, locale }) => {
  const elevation = round(useFeet ? metersToFeet(number) : number, 0);
  return elevation.toLocaleString(locale, {
    useGrouping: true,
    maximumFractionDigits: 0,
  });
});
