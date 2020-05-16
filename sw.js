//Install Service Worker
var CACHE_NAME = 'my-app-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/sitelogo.png'
];

self.addEventListener('install', function(event) {
//Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

//Fetch events
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        //If cache is hit, return response
        if (response) {
          return response;
        }

      //Perform fetch, make network request, and return data
      return fetch(event.request).then(
        function(response) {
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
        }

        //Clone the response
          var responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(function(cache) {
          //Add request to cache for future queries
              cache.put(event.request, responseToCache);
            });
          return response;
        }
      );
   })
  );
});

//Activate events
self.addEventListener('activate', function(event) {

  var cacheWhiteList = ['pages-cache-v1'];

  event.waitUntil(
    //Retrieving all keys from cache
    caches.keys().then(function(cacheNames) {
      return Promise.all(
       //Loop through all cached files
        cacheNames.map(function(cacheName) {
          //If file in cache isn't in whitelist, delete it
          if (cacheWhiteList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
