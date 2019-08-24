import { point, distance, bearing } from '@turf/turf';

function locationAsPoint(location) {
  return point([location.coords.longitude, location.coords.latitude]);
}

export function getSpeed(locationA, locationB) {
  const length = distance(locationAsPoint(locationA), locationAsPoint(locationB));
  const duration = locationB.timestamp - locationA.timestamp;
  const durationInHours = duration / (1000 * 60 * 60);
  // console.log({ length, durationInHours });
  return durationInHours === 0 ? 0 : length / durationInHours;
}

export function getBearing(locationA, locationB) {
  return bearing(locationAsPoint(locationB), locationAsPoint(locationA));
}

export function kmhToMPH(speed) {
  return 0.621371 * speed;
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
