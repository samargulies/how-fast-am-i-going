import Vue from 'vue';
import { round, kmhToMPH } from '@/helpers';

Vue.filter('numberFormatted', (number, { useFeet, locale }) => {
  const elevation = round(useFeet ? kmhToMPH(number) : number, 0);
  return elevation.toLocaleString(locale, {
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
