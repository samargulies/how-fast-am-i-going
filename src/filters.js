import Vue from 'vue';
import { round, kmhToMPH } from '@/helpers';

Vue.filter('numberFormatted', (number, { useFeet, locale }) => {
  const value = useFeet ? 0.621371 * number : number;
  return round(value, 0).toLocaleString(locale, {
    useGrouping: true,
    maximumFractionDigits: 0,
  });
});

Vue.filter('bearingFormatted', (number) => {
  const conversion = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
  ];
  const angle = Math.floor((((number + 180) / 22.5) + 0.5));
  return conversion[angle % 16];
});
