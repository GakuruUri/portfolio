/* Service worker — offline support + installability.
   Strategy: stale-while-revalidate for same-origin GET requests. */
const CACHE = 'uri-portfolio-v1';
const CORE_ASSETS = [
    '/',
    '/index.html',
    '/resume.html',
    '/styles/styles.css',
    '/styles/enhancements.css',
    '/app.js',
    '/enhancements.js',
    '/img/Uri.png',
    '/site.webmanifest'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE).then((c) => c.addAll(CORE_ASSETS)).catch(() => {})
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET') return;
    if (new URL(req.url).origin !== self.location.origin) return;

    event.respondWith(
        caches.match(req).then((cached) => {
            const network = fetch(req)
                .then((res) => {
                    if (res && res.status === 200) {
                        const copy = res.clone();
                        caches.open(CACHE).then((c) => c.put(req, copy));
                    }
                    return res;
                })
                .catch(() => cached);
            return cached || network;
        })
    );
});
