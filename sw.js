const CACHE = "lvlup-v2";
const FILES = ["/", "/index.html", "/icon.png", "/sounds/quest.mp3", "/sounds/levelup.mp3", "/sounds/rankup.mp3"];

self.addEventListener("install", e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener("fetch", e => {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});