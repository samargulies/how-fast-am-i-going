import { point, distance, bearing } from '@turf/turf';

function locationAsPoint(location) {
  return point([location.coords.longitude, location.coords.latitude]);
}

export function getDistance(locationA, locationB) {
  return distance(locationAsPoint(locationA), locationAsPoint(locationB));
}

export function getSpeed(locationA, locationB) {
  const length = getDistance(locationA, locationB);
  const duration = locationB.timestamp - locationA.timestamp;
  const durationInHours = duration / (1000 * 60 * 60);
  // console.log({ length, durationInHours });
  return durationInHours === 0 ? 0 : length / durationInHours;
}

export function getBearing(locationA, locationB) {
  return bearing(locationAsPoint(locationB), locationAsPoint(locationA));
}

export function convertSpeed(speed, units) {
  if (units === 'mph') {
    return 0.621371 * speed;
  } if (units === 'kn') {
    return speed / 1.852;
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

export function chunk(array, size) {
  if (!array) return [];
  const firstChunk = array.slice(0, size); // create the first chunk of the given array
  if (!firstChunk.length) {
    return array; // this is the base case to terminal the recursive
  }
  return [firstChunk].concat(chunk(array.slice(size, array.length), size));
}

export function averageOfSpeeds(locations) {
  if (locations.length < 2) {
    return 0;
  }
  let speed = 0;
  let numSamples = 0;
  locations.forEach((location, index) => {
    if (locations.length - 1 === index) {
      return;
    }
    const nextLocation = locations[index + 1];
    speed += getSpeed(location, nextLocation);
    numSamples += 1;
  });
  return speed / numSamples;
}
