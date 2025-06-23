
const CACHE_NAME = 'quiz-peau-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
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
