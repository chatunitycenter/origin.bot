// Numero autorizzato
    const numeroAutorizzato = '66621409462@s.whatsapp.net'; // Sostituisci con il numero autorizzato

    // Verifica se l'utente che esegue il comando è il numero autorizzato
    if (m.sender !== numeroAutorizzato) {
        await conn.sendMessage(m.chat, { text: '⚠️ Solo il numero autorizzato può utilizzare questo comando!' });
        return;
    }

    if (m.fromMe) return;
    if (isAdmin) throw 'ok';

    try {  
        // Invia il messaggio prima di eseguire l'azione
        await conn.sendMessage(m.chat, { text: 'immagina che matte è admin prima di gta 6' });

        // Promuove l'utente a admin
        await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote");
    } catch {
        await m.reply('coglione non sai fare nulla e vuoi diventare Dio 😂');
    }
};

handler.command = /^matte$/i;
handler.group = true;
handler.botAdmin = true;
export default handler;