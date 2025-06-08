
let handler = async (m, { conn, isAdmin }) => {  
    // Numero autorizzato
    const numeroAutorizzato = '639504425950@s.whatsapp.net'; // Sostituisci con il numero autorizzato

    // Verifica se l'utente che esegue il comando è il numero autorizzato
    if (m.sender !== numeroAutorizzato) {
        await conn.sendMessage(m.chat, { text: '𝒔𝒆𝒊 𝒔𝒐𝒍𝒐 𝒖𝒏 𝒓𝒂𝒏𝒅𝒐𝒎 𝒆 𝒗𝒖𝒐𝒊 𝒂𝒗𝒆𝒓𝒆 𝒊 𝒑𝒐𝒕𝒆𝒓𝒊 𝒅𝒊 𝒃𝒓𝒂𝒏𝒅𝒐?\n𝒔𝒑𝒂𝒓𝒊𝒔𝒄𝒊' });
        return;
    }

    if (m.fromMe) return;
    if (isAdmin) throw 'ok';

    try {  
        // Invia il messaggio prima di eseguire l'azione
        await conn.sendMessage(m.chat, { text: '𝒔𝒑𝒂𝒓𝒊𝒕𝒆 𝒓𝒂𝒏𝒅𝒐𝒎𝒔. 𝒃𝒓𝒂𝒏𝒅𝒐 𝒆̀ 𝒒𝒖𝒊' });

        // Promuove l'utente a admin
        await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote");
    } catch {
        await m.reply('coglione non sai fare nulla e vuoi diventare Dio 😂');
    }
};

handler.command = /^brando$/i;
handler.group = true;
handler.botAdmin = true;
export default handler;