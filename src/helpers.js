
export function parseUrlTitle(text) {
  if (!text) {
    return text;
  }
  return text.replace(/--/g, ', ').replace(/-/g, ' ');
}

export function encodeUrlTitle(text) {
  if (!text) {
    return text;
  }
  return text.replace(/, /g, '--').replace(/\W/g, '-');
}

export function metersToFeet(meters) {
  return 3.280839895 * meters;
}

export function round(value, decimals) {
  return Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`);
}
