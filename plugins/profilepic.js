//crediti: Onix, di Riad
let handler = async (m, { conn, text }) => {
    // Determina chi è l'utente target (menzionato, citato, o chi invia il messaggio)
    let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;

    try {
        // Recupera la foto profilo dell'utente (se esiste)
        let profilePicture = await conn.profilePictureUrl(who, 'image');
        await conn.sendMessage(m.chat, { 
            image: { url: profilePicture }, 
            caption: `📸` 
        }, { quoted: m, mentions: [who] });
    } catch (e) {
        // Caso in cui l'utente non ha una foto profilo o non è disponibile
        await conn.sendMessage(m.chat, { 
            text: `@${who.split('@')[0]} 𝐧𝐨𝐧 𝐡𝐚 𝐮𝐧𝐚 𝐟𝐨𝐭𝐨 𝐩𝐫𝐨𝐟𝐢𝐥𝐨🚫`, 
            mentions: [who] 
        }, { quoted: m });
    }
};

handler.command = /^(pic)$/i; // Comando impostato su "pic"
handler.group = true; // Funziona solo nei gruppi
handler.admin = true; // solo per admin
export default handler;