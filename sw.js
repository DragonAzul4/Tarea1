const CACHE_NAME="V1_cache_PWA";

var urlsToCache=[
     './',
     './css/styles.css',
     './img/16x16.png',
     './img/32x32.png',
     './img/64x64.png',
     './img/96x8.96png',
     './img/128x128.png',
     './img/144x144.png',
     './img/192x192.png',
     './img/240x240.png',
     './img/256x256.png',
     './img/384x384.png',
     './img/512x512.png',
     './img/1024x1024.png',
     './img/icono.png',
     './img/perfil.png',
];

self.addEventListener('install',e=> {
     e.waitUntil(
          caches.open(CACHE_NAME)
          .then(cache => {
               return cache.addAll(urlIsToCache)
               .then(() =>{
                    self.skipWaiting();
               });

          })
          .catch(err=> {
               console.log('No se ha cargado el cache', err);
          })
     );
});

self.addEventListener('activate', e=> {
     const cacheWhiteList = [CACHE_NAME];
     e.waitUntil(
          cahce.keys()
          .then(cacheNames => 
          {
          return Promise.all(
               cacheNames.map(cacheName=>
               {
                    if(cacheWhiteList.indexOf(cacheName)=== -1)
                    {
                         return caches.delete(cacheName);
                    }
               })
          );     
          })
          .then(()=> {
               self.clients.claim();
          })
     );
});

self.addEventListener('fetch', e=> {
     e.respondWith(
          caches.match(e.request)
          .then(res => {
               if(res){
                    return res;
               }
               return fetch(e.request);
          })
     );
});