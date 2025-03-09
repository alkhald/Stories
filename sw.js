const CACHE_NAME = 'stories-app-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/scripts.js',
  '/stories/icon-72x72.png',
  '/stories/icon-96x96.png',
  '/stories/icon-128x128.png',
  '/stories/icon-144x144.png',
  '/stories/icon-152x152.png',
  '/stories/icon-192x192.png',
  '/stories/icon-512x512.png'
];

// تثبيت Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
  );
});

// جلب الموارد من الذاكرة المؤقتة
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
