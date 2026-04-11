self.addEventListener("message", e => {
    if (e.data && e.data.tipo === "agendar") {
        console.log("Agendando notificações...");
        let agora = new Date();
        let horarios = [
            { hora: 10, min: 0, titulo: "⚔ LVL UP", corpo: "Suas quests te esperam. Não deixe o dia passar." },
            { hora: 20, min: 0, titulo: "⚠️ LVL UP", corpo: "Você ainda tem tempo. Bata a meta antes da meia noite." },
            { hora: 23, min: 0, titulo: "💀 LVL UP", corpo: "Última chance. O dia acaba em 1 hora." }
        ];

        horarios.forEach(h => {
            let alvo = new Date();
            alvo.setHours(h.hora, h.min, 0, 0);

            if (alvo <= agora) {
                alvo.setDate(alvo.getDate() + 1);
            }

            let diff = alvo - agora;
            console.log("notificação agendada para daqui:", diff / 1000, "segundos");

            setTimeout(() => {
                self.registration.showNotification(h.titulo, {
                    body: h.corpo,
                    icon: "/icon.png",
                    badge: "/icon.png"
                });
            }, diff);
        });
    }
});