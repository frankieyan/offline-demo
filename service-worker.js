self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("offline-cache")
      .then(cache => {
        const addAssetsToCache = cache.addAll([
          "/",
          "/index.html",
          "/index.css",
          "/index.js",
          "/assets/egg.png",
        ]);

        cache.keys()
          .then(cachedRequests => {
            cachedRequests.forEach(request => console.log(`Asset ${request.url} has been cached`))
          });

        return addAssetsToCache;
      })
      .catch(error => {
        console.warn(`Service worker failed to install with: ${error}`);
      })
  );
});

self.addEventListener("fetch", event => {
  const matchedRequest = caches.match(event.request)
    .then(response => {
      const { url } = event.request
      response
        ? console.log(`Cache hit for: ${url}`)
        : console.log(`Cache missed for: ${url}`);

      return response || fetch(event.request);
    });

    event.respondWith(matchedRequest);
});
