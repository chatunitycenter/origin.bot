let handler = async (m, { conn }) => {
    try {
        // Recupera le informazioni del gruppo
        let groupMetadata = await conn.groupMetadata(m.chat);
        let groupOwner = groupMetadata.owner; // Creatore del gruppo (numero)
        let groupParticipants = groupMetadata.participants; // Membri del gruppo
        let totalMembers = groupParticipants.length; // Numero totale di membri

        // Controlla se il creatore è disponibile
        let ownerTag = groupOwner ? `@${groupOwner.split('@')[0]}` : '𝐂𝐫𝐞𝐚𝐭𝐨𝐫𝐞 𝐧𝐨𝐧 𝐭𝐫𝐨𝐯𝐚𝐭𝐨 ⁉️';

        // Messaggio di risposta con il numero di membri e il creatore del gruppo
        let infoMessage = `
🔵 *𝐂𝐫𝐞𝐚𝐭𝐨𝐫𝐞 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐩𝐨:*
 ➪ ${ownerTag}

⚪️ *𝐌𝐞𝐦𝐛𝐫𝐢 𝐭𝐨𝐭𝐚𝐥𝐢 𝐧𝐞𝐥 𝐠𝐫𝐮𝐩𝐩𝐨:*
 ➪ ${totalMembers} membri
        `;

        // Invia il messaggio con le informazioni
        await conn.sendMessage(
            m.chat, 
            { text: infoMessage, mentions: [groupOwner] }, // Tag del creatore
            { quoted: m }
        );
    } catch (e) {
        console.error(e);
        await conn.sendMessage(
            m.chat, 
            { text: '⚠️ 𝐄𝐫𝐫𝐨𝐫𝐞.' }, 
            { quoted: m }
        );
    }
};

handler.command = /^(membri)$/i; // Comando
handler.group = true; // Solo nei gruppi
handler.admin = true; // Disponibile solo per admin

export default handler;