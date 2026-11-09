const CACHE_NAME = 'mensfire-v111'; // <-- Подняли версию
const ASSETS = [
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './img/icon-dark.png',
  './img/background.jpg',
  './img/Ali.jpg',     
  './img/Benjo.jpg',   
  './img/Ismail.jpg'  
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});