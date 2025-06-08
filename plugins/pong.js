import fetch from 'node-fetch';

var handler = async (m, { text, usedPrefix, command }) => {
    if (!text) {
        await m.reply(`Per favore, inserisci una domanda per far sì che Gemini risponda.\n\nEsempio:\n${usedPrefix + command} Raccomanda un top 10 di film d'azione\n${usedPrefix + command} Codice in JS per un gioco di carte\n${usedPrefix + command} Immagine di un drago futuristico`);
        return;
    }

    try {
        conn.sendPresenceUpdate('composing', m.chat);
        var apii = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(text)}`);
        var res = await apii.json();

        if (res.image) {
           
            await conn.sendMessage(m.chat, { image: { url: res.image }, caption: res.result || "Ecco l'immagine richiesta." }, { quoted: m });
        } else {
            await m.reply(res.result);
        }
    } catch (e) {
        await conn.reply(m.chat, `Si è verificato un errore. Per favore, riprova più tardi.\n\n#report ${usedPrefix + command}\n\n${wm}`, fkontak, m);
        console.log(`Errore nel comando ${usedPrefix + command}`);
        console.log(e);
    }
};

handler.command = ['bard', 'gemini', 'ia', 'ai'];
handler.help = ['bard', 'gemini'];
handler.tags = ['herramientas'];

handler.premium = false;

export default handler;
