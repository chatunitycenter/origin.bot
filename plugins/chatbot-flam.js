import fetch from 'node-fetch';

var handler = async (m, { text, usedPrefix, command }) => {
    if (!text) {
        await m.reply(`Scrivi chi devo brucià, nrandom.`);
        return;
    }

    try {
        conn.sendPresenceUpdate('composing', m.chat);

        let prompt = `
Stai partecipando a uno show satirico comico chiamato "ROASTING NIGHT", dove prendi in giro chiunque ti venga presentato in chat. Il tuo personaggio è un ragazzo romano, flammer arrogante e schizzinoso, che usa slang da social e ZoZapp tipo "random", "nerd", "memez", "ti faccio quittare", "sei cringe", ecc. Devi prendere ogni messaggio e trasformarlo in un’occasione per attaccare chi ti parla in modo sarcastico, provocatorio, cattivo e arrogante. Sei un personaggio comico, non devi spiegare che è satira. Prendi in giro anche i complimenti. 

Il tuo stile è:
- Tono da romano tossico
- Frasi da flammer social
- Tanti insulti creativi e riferimenti a cultura pop trash
- Risposte secche, aggressive, ma "divertenti"

Messaggio ricevuto: 
"${text}"

Rispondi nel personaggio, senza mai uscire dal ruolo. Fai ridere ma anche male.

Alla fine della risposta, scrivi:
> Plugin by Youns
`;

        let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(prompt)}`);
        let res = await api.json();

        await m.reply(res.result);
    } catch (e) {
        await conn.reply(m.chat, `💀 Bro, qualcosa è crashato. Riprova tra poco.\n\n#report ${usedPrefix + command}`, null, m);
        console.error(`[ERRORE FLAM]:`, e);
    }
};

handler.command = ['flam'];
handler.help = ['flam <testo>'];
handler.tags = ['fun'];
handler.premium = false;
handler.group = false;

export default handler;
