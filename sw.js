const CACHE_NAME = 'mensfire-v170'; // <-- Подняли версию
const ASSETS = [
  './index.html',
  './style.css',
  './script.js',
  './nishman.css',
  './nishman-data.js',
  './manifest.json',
  './img/icon-dark.png',
  './img/background.jpg',
  './img/Ali.jpg',     
  './img/Benjo.jpg',   
  './img/Ismail.jpg'  
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        ASSETS.map((url) => cache.add(url).catch((err) => {
          console.warn('SW: не удалось закешировать', url, err);
        }))
      );
    })
  );
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

/* =========================================
   ОБРАБОТКА ЗАПРОСА НА НЕМЕДЛЕННОЕ ОБНОВЛЕНИЕ
   ========================================= */
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});