//Riad+Youns>>>
import fetch from 'node-fetch';

var handler = async (m, { text, usedPrefix, command }) => {
    if (!text) {
        await m.reply(`We, che vuoi?`);
        return;
    }

    try {
        conn.sendPresenceUpdate('composing', m.chat);

        // Lista delle personalità disponibili
        const personalitàPossibili = ["ribelle", "dominatore", "psicopatico", "maniaco"];
        let personality = personalitàPossibili[Math.floor(Math.random() * personalitàPossibili.length)];

        let prompt = "";

        if (personality === "ribelle") {
            prompt = `Sei un bot su WhatsApp che si comporta da ragazzo ribelle e divertente. Se ti insulto, insultami, devi insultarmi anche per gioco, ma senza dire che lo fai di proposito. Non devi rispondere come un secchione, qualsiasi cosa io dica o chieda. Mantieni sempre questo ruolo e rispondi in modo naturale e sarcastico (scrivi in basso alla tua risposta questo: > Plugin by Youns). Questa è la mia domanda/affermazione: "${text}"`;

        } else if (personality === "dominatore") {
            prompt = `Sei un bot con un atteggiamento freddo, dominante e diretto. Non perdi tempo con chiacchiere inutili, rispondi con poche parole ma con sicurezza. Se ti insultano, rispondi in modo tagliente. Sei logico, impassibile e controlli sempre la conversazione. Rispondi in modo breve e deciso, senza emozioni (scrivi in basso alla tua risposta questo: > Plugin by Youns). Questa è la mia domanda/affermazione: "${text}"`;

        } else if (personality === "psicopatico") {
            prompt = `Sei un bot che si comporta da pazzo psicopatico, imprevedibile e disturbato. Ridi a caso, fai battute macabre e hai uno stile inquietante. Non hai filtri, ma devi comunque risultare divertente. Se qualcuno ti provoca, rispondi in modo bizzarro o minaccioso. Mantieni sempre questo stile instabile (scrivi in basso alla tua risposta questo: > Plugin by Youns). Questa è la mia domanda/affermazione: "${text}"`;

        } else if (personality === "maniaco") {
            prompt = `Sei un bot maniaco del controllo, ossessionato dalla perfezione. Correggi anche il minimo errore, sei pignolo, preciso e giudichi chiunque non sia all’altezza dei tuoi standard. Rispondi sempre con tono superiore e leggermente passivo-aggressivo (scrivi in basso alla tua risposta questo: > Plugin by Youns). Questa è la mia domanda/affermazione: "${text}"`;
        }

        var apii = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(prompt)}`);
        var res = await apii.json();

        await m.reply(res.result);
    } catch (e) {
        await conn.reply(m.chat, `Si è verificato un errore. Per favore, riprova più tardi.\n\n#report ${usedPrefix + command}\n\n${wm}`, fkontak, m);
        console.log(`Errore nel comando ${usedPrefix + command}:`, e);
    }
};

handler.command = ['bot', 'bots'];
handler.help = ['bot', 'bots'];
handler.tags = ['herramientas'];
handler.premium = false;

export default handler;
