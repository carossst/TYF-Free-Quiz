// Service Worker pour "Test Your French Quiz"
// Version 1.0.0

// Gestion des mises à jour
// Quand vous mettez à jour votre quiz :
// 1. Modifiez la version dans le nom du cache (ex: 'french-quiz-cache-v2')
// 2. Redéployez tous vos fichiers
// Les utilisateurs obtiendront automatiquement la nouvelle version au prochain chargement
const CACHE_NAME = 'french-quiz-cache-v1';

// Liste des ressources à mettre en cache immédiatement
const INITIAL_CACHED_RESOURCES = [
  './', 
  'index.html',
  'style.css',
  'sw.js',
  'manifest.json',
  // Fichiers audio
  'audio/TYF_Lead_6.mp3',
  'audio/TYF_Lead_7.mp3',
  // Icônes - toutes les tailles du manifest.json
  'icons/icon-48x48.png',
  'icons/icon-72x72.png',
  'icons/icon-96x96.png',
  'icons/icon-128x128.png',
  'icons/icon-152x152.png',
  'icons/icon-192x192.png',
  'icons/icon-256x256.png',
  'icons/icon-384x384.png',
  'icons/icon-512x512.png',
  // Font Awesome (via CDN)
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Installation du Service Worker
self.addEventListener('install', event => {
  console.log('[Service Worker] Installation en cours...');
  
  // Forcer l'activation immédiate sans attendre la fermeture des onglets
  self.skipWaiting();
  
  // Mettre en cache toutes les ressources initiales
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Mise en cache des ressources');
        return cache.addAll(INITIAL_CACHED_RESOURCES);
      })
      .then(() => {
        // Envoyer un message à l'application pour indiquer que le cache est prêt
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: 'offline-ready',
              message: 'Le quiz est maintenant disponible hors-ligne!'
            });
          });
        });
      })
  );
});

// Activation du Service Worker et nettoyage des anciens caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activation en cours...');
  
  // Supprimer les anciens caches lors de la mise à jour
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] Activation terminée');
      return self.clients.claim();
    })
  );
});

// Stratégie de cache: Cache-First avec mise à jour en arrière-plan
self.addEventListener('fetch', event => {
  // Ignorer les requêtes non GET
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Retourner la réponse du cache si elle existe
        const fetchPromise = fetch(event.request)
          .then(networkResponse => {
            // Mise à jour du cache en arrière-plan si la requête réseau a réussi
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
            }
            return networkResponse;
          })
          .catch(error => {
            console.log('[Service Worker] Échec de récupération:', error);
            // Silence les erreurs de récupération réseau quand on est hors-ligne
          });
          
        // Si on a une copie en cache, la retourner immédiatement
        // Sinon essayer le réseau
        return cachedResponse || fetchPromise;
      })
  );
});

// Gestion des messages entre l'application et le Service Worker
self.addEventListener('message', event => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});