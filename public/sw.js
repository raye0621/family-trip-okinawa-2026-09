const CACHE_NAME = 'okinawa-family-trip-v12';
const SCOPE = self.registration.scope;
const APP_SHELL = [
  '',
  'booklet/',
  'manifest.webmanifest',
  'favicon-v2.png',
  'app-icon-v2-192.png',
  'app-icon-v2-512.png',
  'apple-touch-icon-v2.png',
].map((path) => new URL(path, SCOPE).href);

async function cacheAppShell() {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(APP_SHELL);
  const home = await fetch(new URL('', SCOPE));
  const html = await home.text();
  const assets = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
    .map((match) => new URL(match[1], SCOPE).href)
    .filter((url) => url.includes('/_next/'));
  await cache.addAll([...new Set(assets)]);
}

self.addEventListener('install', (event) => {
  event.waitUntil(cacheAppShell());
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match(new URL('', SCOPE))))
  );
});
