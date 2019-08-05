import punycode from 'punycode';

export function parseUrlTitle(text) {
  if (!text) {
    return text;
  }
  return punycode.decode(text).replace(/--/g, ', ').replace(/-/g, ' ');
}

export function encodeUrlTitle(text) {
  if (!text) {
    return text;
  }
  return punycode.encode(text).replace(/,\W/g, '--').replace(/\W/g, '-');
}

export function metersToFeet(meters) {
  return 3.280839895 * meters;
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
