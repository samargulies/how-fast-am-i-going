import jsonp from 'jsonp';

const baseUrl = 'https://dev.virtualearth.net/REST/v1';
const keys = process.env.VUE_APP_BING_API_KEYS.split(',');

function getKey() {
  return keys[Math.floor(Math.random() * keys.length)];
}

function getLocation({ latitude, longitude, lang = 'en-US' }) {
  const key = getKey();
  const url = `${baseUrl}/Locations/${latitude},${longitude}?key=${key}&culture=${lang}`;
  return new Promise((resolve, reject) => {
    jsonp(url, { param: 'jsonp' }, (error, data) => {
      if (error) {
        console.error(error.message);
        reject(error);
      } else {
        // console.log(data);
        resolve(data.resourceSets[0].resources[0].address.formattedAddress);
      }
    });
  });
}

function getElevation({ latitude, longitude }) {
  const key = getKey();
  const url = `${baseUrl}/Elevation/List/?key=${key}&points=${latitude},${longitude}`;
  return new Promise((resolve, reject) => {
    jsonp(url, { param: 'jsonp' }, (error, data) => {
      if (error) {
        console.error(error.message);
        reject(error);
      } else {
        // console.log(data);
        resolve(data.resourceSets[0].resources[0].elevations[0]);
      }
    });
  });
}

function getAutosuggestions({ query, lang = 'en-US' }) {
  const key = getKey();
  const url = `${baseUrl}/Locations/?key=${key}&query=${query}&culture=${lang}`;
  return new Promise((resolve, reject) => {
    jsonp(url, { param: 'jsonp' }, (error, data) => {
      if (error) {
        console.error(error.message);
        reject(error);
      } else {
        // console.log(data);
        resolve(data.resourceSets[0].resources);
      }
    });
  });
}

export default { getElevation, getLocation, getAutosuggestions };
