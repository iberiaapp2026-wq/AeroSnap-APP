const CACHE = 'inspeccion-avion-v2';
const ASSETS = ['./index.html', './manifest.json', './app-icon-192.png', './app-icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Solo cacheamos la interfaz; los envíos a Apps Script siempre van a la red.
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
