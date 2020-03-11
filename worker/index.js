const Papa = require('papaparse');

const DATASET_TEMPLATE_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-{section}.csv';

async function fetchData(event, section, cacheDuration = 3600) {
  const url = DATASET_TEMPLATE_URL.replace('{section}', section);
  const cache = caches.default;
  let response = await cache.match(url);

  if (!response) {
    response = await fetch(url);
    response = new Response(response.body, {
      headers: { 'Cache-Control': `max-age=${cacheDuration}` },
    });
    event.waitUntil(cache.put(url, response.clone()));
  }
  const text = await response.text();
  return Papa.parse(text, { header: true }).data;
}

async function handler(event) {
  try {
    const responses = await Promise.all([
      fetchData(event, 'Recovered'),
      fetchData(event, 'Confirmed'),
      fetchData(event, 'Deaths'),
    ]);

    const [recovered, confirmed, deaths] = await Promise.all(responses);

    return new Response(JSON.stringify({ recovered, confirmed, deaths }), {
      headers: {
        'Cache-Control': 'max-age=3600',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(error.stack, {
      status: 500,
      headers: {
        'Cache-Control': 'max-age=60',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

function handleOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
// eslint-disable-next-line no-restricted-globals
addEventListener('fetch', (event) => {
  if (event.request.method === 'OPTIONS') {
    // Handle CORS preflight requests
    return event.respondWith(handleOptions());
  }
  return event.respondWith(handler(event));
});
