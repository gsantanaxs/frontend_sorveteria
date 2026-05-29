self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        Promise.all([
            // Clear all caches
            caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key)))),
            // Unregister self
            self.registration.unregister(),
            // Claim clients
            self.clients.claim()
        ]).then(() => {
            // Reload all open pages to ensure they fetch from network
            return self.clients.matchAll({ type: 'window' }).then(clients => {
                clients.forEach(client => {
                    if (client.url && 'navigate' in client) {
                        client.navigate(client.url);
                    }
                });
            });
        })
    );
});
