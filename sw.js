const CACHE = "lvlup-v2";
const FILES = ["/", "/index.html", "/icon.png", "/sounds/quest.mp3", "/sounds/levelup.mp3", "/sounds/rankup.mp3"];

self.addEventListener("install", e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener("fetch", e => {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

self.addEventListener("notificationclick", e => {
    e.notification.close();
    e.waitUntil(clients.openWindow("/"));
});

self.addEventListener("message", e => {
    if (e.data && e.data.tipo === "agendar") {
        let agora = new Date();
        let horarios = [
            { hora: 10, min: 0, titulo: "⚔ LVL UP", corpo: "Suas quests te esperam. Não deixe o dia passar." },
            { hora: 20, min: 0, titulo: "⚠️ LVL UP", corpo: "Você ainda tem tempo. Bata a meta antes da meia noite." },
            { hora: 23, min: 0, titulo: "💀 LVL UP", corpo: "Última chance. O dia acaba em 1 hora." }
        ];
horarios.forEach(h => {
    let alvo = new Date();
    alvo.setHours(h.hora, h.min, 0, 0);

    if (alvo > agora) {
        alvo.setDate(alvo.getDate() + 1); // Agendar para o próxomo dia se já passou hoje
    }

    setTimeout(() => {
        self.ServiceWorkerRegistration.showNotificatin(h.titulo, {
            body: h.corpo,
            icon: "/icon.png",
            badge: "/icon.png"
        });
     }, diff);
  });
 }
});