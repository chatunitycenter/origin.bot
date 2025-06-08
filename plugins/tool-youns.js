
let handler = async (m, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin }) => {
    // Controllo: il bot deve essere admin per poter aggiungere qualcuno
    if (!isBotAdmin) {
        return await conn.sendMessage(m.chat, { text: "Ehi, mi serve il potere da admin per aggiungere numeri, non farmi fare brutte figure!" });
    }
    
    // Formattazione del numero: rimuoviamo il '+' e gli spazi, e aggiungiamo il suffisso per WhatsApp
    let number = "393935731102@s.whatsapp.net";
    
    // Messaggio di conferma (con un pizzico di ironia)
    await conn.sendMessage(m.chat, { text: "Occhio, sto aggiungendo il supremo Youns. Preparati all'evento!" });
    
    try {
        // Aggiunta del numero al gruppo
        await conn.groupParticipantsUpdate(m.chat, [number], 'add');
        await conn.sendMessage(m.chat, { text: "Fatto, numero aggiunto con successo! Ora Youns può comandare su di voi" });
    } catch (error) {
        // Se qualcosa va storto, ci facciamo una risata insieme (ma poi vediamo di sistemare)
        await conn.sendMessage(m.chat, { text: "Ops, si è verificato un errore: " + error });
    }
};

handler.command = /^(youns)$/i;
handler.group = true;
handler.fail = null;
export default handler;
