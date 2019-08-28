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
