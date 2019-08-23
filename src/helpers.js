import { point, distance, bearing } from '@turf/turf';

function positionAsPoint(position) {
  return point([position.coords.longitude, position.coords.latitude]);
}

export function getSpeed(positionA, positionB) {
  const length = distance(positionAsPoint(positionA), positionAsPoint(positionB));
  const duration = positionB.timestamp - positionA.timestamp;
  const durationInHours = duration / (1000 * 60 * 60);
  console.log({ length, durationInHours });
  return durationInHours === 0 ? 0 : length / durationInHours;
}

export function getBearing(positionA, positionB) {
  return bearing(positionAsPoint(positionB), positionAsPoint(positionA));
}

export function kmhToMPH(speed) {
  return 1.609344 * speed;
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
