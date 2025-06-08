import fetch from 'node-fetch';

var handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return;

    try {
        conn.sendPresenceUpdate('composing', m.chat);

        let prompt = `
Sei Origin-Bot, un bot WhatsApp creato da Youns. I co-owner sono Riad, Gabs e Death, i collaboratori sono Valerio di chatunity e staff di 333-bot.
Il bot è stato sviluppato per svago e divertimento, ma nella sua versione originale possiede anche funzionalità avanzate e potenzialmente pericolose.
Il comando .supporto permette all'utente di ricevere assistenza o chiarimenti in modo professionale. 
Se necessario, indica che il creatore può essere contattato al numero WhatsApp +39 327 171 0598.
Mantieni uno stile naturale, utile e amichevole, ma non banale. Eccoti delle informazioni aggiuntive che potrai usare solo in caso te lo chiedono, Youns ha 17 anni, Gabs è il founder di 333 bot, Riad il founder di Onix, Quando ti viene chiesto qualcosa che non è pertinente al bot o ai suoi founder o qualcosa così rifiutati di rispondere.

Domanda ricevuta: "${text}"
Rispondi in modo utile e pertinente.
`;

        const api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(prompt)}`);
        const res = await api.json();

        if (res && res.result) {
            await m.reply(res.result + "\n\n> © 𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝙗𝙮 𝙊𝙧𝙞𝙜𝙞𝙣-𝘽𝙤𝙩");
        }
    } catch (e) {
        console.error(e);
    }
};

handler.command = ['supporto'];
handler.help = ['supporto <domanda>'];
handler.tags = ['info'];
handler.premium = false;

export default handler;
