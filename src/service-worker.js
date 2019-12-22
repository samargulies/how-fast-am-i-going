/* eslint-disable */
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

  workbox.precaching.precacheAndRoute(self.__precacheManifest, {
    ignoreURLParametersMatching: [/_redirects/, /ads\.txt/],
  });
} else {
  console.log('Workbox didn\'t load');
}
