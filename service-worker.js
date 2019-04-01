importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js');

if (workbox) {
  workbox.routing.registerRoute(
    new RegExp('.*bible\.js'),
    new workbox.strategies.CacheFirst()
  );
  workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    new workbox.strategies.StaleWhileRevalidate()
  );
  workbox.routing.registerRoute(
    /\.css$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'css-cache',
    })
  );
  workbox.googleAnalytics.initialize();
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
