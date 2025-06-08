let handler = async (m, { conn, groupMetadata, participants, isBotAdmin }) => {
    if (!isBotAdmin) {
        await conn.sendMessage(m.chat, { text: "❌ Il bot deve essere amministratore per eseguire questo comando!" });
        return;
    }
    await conn.groupSettingUpdate(m.chat, 'announcement'); 
    const ownerGroup = groupMetadata.owner || null;
    const admins = participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(a => a.id);
    const adminsToRemove = admins.filter(admin => admin !== conn.user.jid && admin !== ownerGroup);

    if (adminsToRemove.length === 0) {
        await conn.sendMessage(m.chat, { text: "⚠️ Non ci sono amministratori da rimuovere, oltre al bot e al founder." });
        return;
    }
    
    for (let admin of adminsToRemove) {
        try {
            await conn.groupParticipantsUpdate(m.chat, [admin], 'demote');
            await new Promise(resolve => setTimeout(resolve, 300)); 
        } catch (err) {
            console.error(`Errore nella rimozione di ${admin}:`, err);
        }
    }
    
    await conn.sendMessage(m.chat, { text: "*_Modalità sicurezza attivata_*" });
};

handler.command = /^sicurezza$/i;
handler.group = true;               
handler.rowner = true;   
handler.botAdmin = true;           
export default handler;