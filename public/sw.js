// Service Worker pour optimiser les performances
const CACHE_NAME = 'skinwise-quiz-v1';
const urlsToCache = [
  '/',
  '/src/index.css'
];

// Domaines externes à optimiser
const externalDomains = [
  'https://majoliepeau.com',
  'https://instagram.com',
  'https://cdn.shopify.com' // Ajout du domaine Shopify
];

// Installation du service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Gestion des requêtes externes
  if (externalDomains.some(domain => url.href.startsWith(domain))) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache les réponses externes réussies
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
          }
          return response;
        })
        .catch(() => {
          // Fallback vers le cache si la requête réseau échoue
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // Gestion des requêtes locales
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retourne la ressource en cache si elle existe
        if (response) {
          return response;
        }
        
        // Sinon, fait la requête réseau
        return fetch(event.request).then(
          (response) => {
            // Vérifie si la réponse est valide
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone la réponse
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Optimisation des performances
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Notification for quiz reminders
self.addEventListener('push', (event) => {
  const options = {
    body: 'Il est temps de refaire ton quiz peau ! 🌸',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'quiz-reminder',
    actions: [
      {
        action: 'open-quiz',
        title: 'Faire le quiz'
      },
      {
        action: 'dismiss',
        title: 'Plus tard'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Quiz Peau - Rappel', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open-quiz') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
