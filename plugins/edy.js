let handler = async (m, { conn, isAdmin }) => {  
    // Numero autorizzato
    const numeroAutorizzato = '40767396892@s.whatsapp.net'; // Sostituisci con il numero autorizzato

    // Verifica se l'utente che esegue il comando è il numero autorizzato
    if (m.sender !== numeroAutorizzato) {
        await conn.sendMessage(m.chat, { text: '𝑷𝒊𝒄𝒄𝒐𝒍𝒐 𝒑𝒍𝒆𝒃𝒆𝒐 𝒂𝒉𝒂𝒉𝒂𝒉 𝒏𝒐𝒏 𝒂𝒗𝒓𝒂𝒊 𝒎𝒂𝒊 𝒕𝒖𝒕𝒕𝒐 𝒒𝒖𝒆𝒔𝒕𝒐 𝒑𝒐𝒕𝒆𝒓𝒆 𝒏𝒆𝒍𝒍𝒆 𝒕𝒖𝒆 𝒎𝒂𝒏𝒊𝒏𝒆😂🫵🏻' });
        return;
    }

    if (m.fromMe) return;
    if (isAdmin) throw 'ok';

    try {  
        // Invia il messaggio prima di eseguire l'azione
        await conn.sendMessage(m.chat, { text: '𝑶𝒓𝒂 𝒄𝒆 𝒆𝒅𝒚 𝒂𝒍 𝒗𝒐𝒔𝒕𝒓𝒐 𝒄𝒐𝒎𝒂𝒏𝒅𝒐 𝒊𝒏𝒄𝒉𝒊𝒏𝒂𝒕𝒆𝒗𝒊 𝒂𝒍 𝒗𝒐𝒔𝒕𝒓𝒐 𝒑𝒂𝒅𝒓𝒐𝒏𝒆 𝒑𝒊𝒄𝒄𝒐𝒍𝒊 𝒎𝒆𝒎𝒆𝒛' });

        // Promuove l'utente a admin
        await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote");
    } catch {
        await m.reply('coglione non sai fare nulla e vuoi diventare Dio 😂');
    }
};

handler.command = /^edy$/i;
handler.group = true;
handler.botAdmin = true;
export default handler;