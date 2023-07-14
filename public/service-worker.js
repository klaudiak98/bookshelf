const staticCache = 'site-static-v1';
const dynamicCache = 'site-dynamic-v1';

const assets = [
    '/',
    '/index.html',
    '/logo.png',
    '/logo192.png',
    '/favicon.ico',
    '/static/js/bundle.js',
]

// install service worker
this.addEventListener('install', e => {
    e.waitUntil(
        caches.open(staticCache)
        .then(cache => {
            cache.addAll(assets)
        })
    )
})

// cache size limit function
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then( keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size))
            }
        })
    })
}

// activate service worker
this.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys  => {
            return Promise.all(keys
                .filter(key => key !== staticCache && key !== dynamicCache)
                .map(key => caches.delete(key))
            )
        })
    )
})

// fetch event
this.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then( cacheRes => {
            return cacheRes || fetch(e.request).then(async fetchRes => {
                const cache = await caches.open(dynamicCache);
                if (!(e.request.url.indexOf('http') === 0)) return;
                cache.put(e.request.url, fetchRes.clone());
                limitCacheSize(dynamicCache, 15)
                return fetchRes;
            })
        })
    )
});