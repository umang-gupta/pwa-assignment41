  var CACHE_NAME = 'my-site-cache-v1';
  var urlsToCache = [
    '.',
    '/',
    '/app.js',
    '/css/materialize.min.css',
    '/css/style.css',
    '/manifest.json',
    '/img/rounded-rectangle.png'

  ];
  self.addEventListener('fetch', function(event) {
    console.log(event.request)
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
  
          return fetch(event.request).then(
            function(response) {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                
                console.log(response)
                return response;
              }
              
  
              // IMPORTANT: Clone the response. A response is a stream
              // and because we want the browser to consume the response
              // as well as the cache consuming the response, we need
              // to clone it so we have two streams.
              var responseToCache = response.clone();
  
              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            }
          );
        })
      );
  });