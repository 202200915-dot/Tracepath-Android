/* Tracepath service worker.
   - Precaches the app shell so the app opens offline.
   - Serves same-origin files from cache first, and refreshes them in the background.
   - A new worker waits until the person taps "Reload" in the app (message: SKIP_WAITING).
   Bump VERSION whenever you ship changes so old caches are cleared. */
const VERSION = "1.2.0";
const CACHE = "tracepath-" + VERSION;
const SHELL = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "css/styles.css",
  "js/i18n.js",
  "js/resources.js",
  "js/data.js",
  "js/app.js",
  "fonts/bricolage.woff2",
  "fonts/plex-400.woff2",
  "fonts/plex-500.woff2",
  "fonts/plex-600.woff2",
  "icons/icon.svg",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-512.png",
  "icons/apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("tracepath-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // never touch third-party requests

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const key = req.mode === "navigate" ? "index.html" : req;
    const cached = await cache.match(key, { ignoreSearch: true });
    const refresh = fetch(req)
      .then((res) => { if (res && res.ok && res.type === "basic") cache.put(key, res.clone()); return res; })
      .catch(() => null);
    if (cached) { event.waitUntil(refresh); return cached; }
    const res = await refresh;
    if (res) return res;
    if (req.mode === "navigate") { const home = await cache.match("index.html"); if (home) return home; }
    return new Response("Offline", { status: 503, statusText: "Offline", headers: { "Content-Type": "text/plain" } });
  })());
});
