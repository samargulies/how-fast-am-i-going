import axios from 'axios';

const baseUrl = 'https://a1gehjprye.execute-api.us-east-1.amazonaws.com/dev/v1/elevation';
const API_KEY = process.env.VUE_APP_API_KEY;

function getElevation({ latitude, longitude }) {
  const url = `${baseUrl}?lat=${latitude}&lng=${longitude}`;
  const settings = {
    headers: {
      'x-api-key': API_KEY,
    },
  };
  return axios(url, settings).then(response => response.data.elevation);
}

export default { getElevation };
