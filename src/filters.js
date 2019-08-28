import Vue from 'vue';
import { round, convertSpeed } from '@/helpers';

Vue.filter('numberFormatted', (number, { units, locale }) => {
  const speed = convertSpeed(number, units);
  return round(speed, 0).toLocaleString(locale, {
    useGrouping: true,
    maximumFractionDigits: 0,
  });
});

Vue.filter('headingFormatted', (number) => {
  const conversion = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
  ];
  const angle = Math.floor(((number / 22.5) + 0.5));
  return conversion[angle % 16];
});
