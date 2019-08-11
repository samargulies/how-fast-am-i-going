if (workbox) {
  console.log('Workbox is loaded');

  workbox.routing.registerRoute(
    new RegExp('/'),
    workbox.strategies.NetworkFirst(),
  );

  workbox.routing.registerRoute(
    new RegExp('https://use.typekit.net'),
    workbox.strategies.cacheFirst(),
  );

  workbox.routing.registerRoute(
    new RegExp('https://dev.virtualearth.net'),
    workbox.strategies.NetworkOnly({
      cacheName: 'api-bing',
    }),
  );

  workbox.routing.registerRoute(
    new RegExp('https://a1gehjprye.execute-api.us-east-1.amazonaws.com'),
    workbox.strategies.NetworkOnly({
      cacheName: 'api',
    }),
  );

  workbox.precaching.precacheAndRoute(self.__precacheManifest);
} else {
  console.log('Workbox didn\'t load');
}
