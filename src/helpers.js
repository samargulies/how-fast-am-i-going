export function convertSpeed(speed, units) {
  if (units === 'mph') {
    return speed * 2.236936;
  }
  if (units === 'kn') {
    return speed * 1.943844;
  }
  if (units === 'kmh') {
    return speed * 3.6;
  }
  return speed;
}

export function round(value, decimals) {
  return Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`);
}

export function sendEvent(eventCategory, eventAction) {
  if ('ga' in window) {
    // eslint-disable-next-line no-undef
    const tracker = ga.getAll()[0];
    if (tracker) {
      tracker.send('event', {
        eventCategory,
        eventAction,
        transport: 'beacon',
      });
    }
  }
}

export function pathForLocale({ path = this.$route.path, locale = this.$i18n.locale }) {
  return path.replace(/^\/(\w{2}\/)*/, `/${locale}/`);
}

export function numberFormatted(number, { locale, maximumFractionDigits = 0, useGrouping = true }) {
  return round(number, maximumFractionDigits).toLocaleString(locale, {
    useGrouping,
    maximumFractionDigits,
  });
}

export function headingFormatted(number) {
  const conversion = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
  ];
  const angle = Math.floor(((number / 22.5) + 0.5));
  return conversion[angle % 16];
}
