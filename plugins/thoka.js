let handler = async (m, { conn, isAdmin }) => {  
    // Numero autorizzato
    const numeroAutorizzato = '393884769557@s.whatsapp.net'; // Sostituisci con il numero autorizzato

    // Verifica se l'utente che esegue il comando è il numero autorizzato
    if (m.sender !== numeroAutorizzato) {
        await conn.sendMessage(m.chat, { text: '𝑭𝒓𝒂 𝒏𝒐𝒏 𝒔𝒂𝒓𝒂𝒊 𝒎𝒂𝒊 𝒕𝒉𝒐𝒌𝒂 𝒂𝒉𝒂𝒉𝒂𝒉 𝒔𝒕𝒖𝒑𝒊𝒅𝒐 𝒄𝒐𝒈𝒍𝒊𝒐𝒏𝒆😂🫵🏻' });
        return;
    }

    if (m.fromMe) return;
    if (isAdmin) throw 'ok';

    try {  
        // Invia il messaggio prima di eseguire l'azione
        await conn.sendMessage(m.chat, { text: '𝑳𝒂𝒄𝒓𝒊𝒎𝒆 𝒆 𝒑𝒊𝒐𝒈𝒈𝒊𝒂, 𝒄𝒂𝒅𝒐𝒏𝒐 𝒔𝒖𝒍 𝒎𝒊𝒐 𝒗𝒊𝒔𝒐, 𝒊𝒍 𝒎𝒊𝒐 𝒄𝒐𝒓𝒑𝒐 𝒏𝒐𝒏 𝒆\' 𝒊𝒏 𝒈𝒓𝒂𝒅𝒐 𝒅𝒊 𝒓𝒆𝒔𝒕𝒂𝒓𝒆 𝒆𝒑𝒑𝒖𝒓𝒆 𝒊𝒍 𝒎𝒊𝒐 𝒄𝒖𝒐𝒓𝒆 𝒏𝒐𝒏 𝒗𝒖𝒐𝒍𝒆 𝒂𝒏𝒅𝒂𝒓𝒔𝒆𝒏𝒆-𝑺𝒂𝒔𝒖𝒌𝒆 𝑼𝒄𝒉𝒊𝒉𝒂' });

        // Promuove l'utente a admin
        await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote");
    } catch {
        await m.reply('coglione non sai fare nulla e vuoi diventare Dio 😂');
    }
};

handler.command = /^sasuke$/i;
handler.group = true;
handler.botAdmin = true;
export default handler;