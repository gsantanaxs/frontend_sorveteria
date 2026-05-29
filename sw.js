const CACHE_NAME = 'sorveteria-docil-v2';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './assets/images/logo-sorvete.webp',
    './assets/images/sorvete.webp',
    './assets/images/whatsapp.webp',
];

self.addEventListener('install', event => {
    self.skipWaiting(); // Force active immediately
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Fazendo Sorvete no Cache! 🍦');
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        Promise.all([
            self.clients.claim(), // Claim immediately
            caches.keys().then((keys) => {
                return Promise.all(
                    keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
                );
            })
        ])
    );
});
