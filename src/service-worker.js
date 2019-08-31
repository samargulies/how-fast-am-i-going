if (workbox) {
  console.log('Workbox is loaded');

  workbox.routing.registerRoute(
    new RegExp('/.*'),
    new workbox.strategies.StaleWhileRevalidate(),
  );

  workbox.routing.registerRoute(
    new RegExp('https://use.typekit.net'),
    new workbox.strategies.StaleWhileRevalidate(),
  );

  workbox.routing.registerRoute(
    new RegExp('https://dev.virtualearth.net'),
    new workbox.strategies.NetworkOnly({
      cacheName: 'api-bing',
    }),
  );

  workbox.routing.registerRoute(
    new RegExp('https://a1gehjprye.execute-api.us-east-1.amazonaws.com'),
    new workbox.strategies.NetworkOnly({
      cacheName: 'api',
    }),
  );

  workbox.precaching.precacheAndRoute(self.__precacheManifest, {
    ignoreURLParametersMatching: [/_redirects/, /ads.txt/],
  });
} else {
  console.log('Workbox didn\'t load');
}
