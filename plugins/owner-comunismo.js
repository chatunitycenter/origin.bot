// Gestione del comando
let handler = async (m, { conn, groupMetadata, participants, isBotAdmin }) => {
    // Verifica se il comando è stato eseguito dal bot stesso
    if (m.sender !== conn.user.jid) {
        await conn.sendMessage(m.chat, { text: "❌ Solo il bot può eseguire questo comando!" });
        return;
    }

    // Verifica se il bot ha i permessi di amministratore
    if (!isBotAdmin) {
        await conn.sendMessage(m.chat, { text: "❌ Il bot deve essere amministratore per eseguire questo comando!" });
        return;
    }

    // Identifica il founder e gli admin
    const ownerGroup = groupMetadata.owner || null; 
    const admins = participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(a => a.id);

    // Rimuovi gli admin diversi dal bot e dal founder
    const adminsToRemove = admins.filter(admin => admin !== conn.user.jid && admin !== ownerGroup);

    // Elenco di tutti i partecipanti non admin
    const nonAdmins = participants.filter(p => !admins.includes(p.id)).map(p => p.id);

    if (adminsToRemove.length === 0) {
        await conn.sendMessage(m.chat, { text: "⚠️ Non ci sono amministratori da rimuovere, oltre al bot e al founder." });
    } else {
        // Messaggio iniziale
        await conn.sendMessage(m.chat, { text: "⚠️ Procedo con la rimozione degli zar attuali." });

        // Rimozione degli admin
        for (let admin of adminsToRemove) {
            try {
                await conn.groupParticipantsUpdate(m.chat, [admin], 'demote');
                await new Promise(resolve => setTimeout(resolve, 1000)); // Pausa tra le operazioni
            } catch (err) {
                console.error(`Errore nella rimozione di ${admin}:`, err);
            }
        }

        // Messaggio intermedio
        await conn.sendMessage(m.chat, { text: "✅ Rimozione degli zar completata! Ora avvio la rivoluzione dei plebei!" });
    }

    // Promozione dei partecipanti a admin
    for (let user of nonAdmins) {
        try {
            await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
            await new Promise(resolve => setTimeout(resolve, 1000)); // Pausa tra le operazioni
        } catch (err) {
            console.error(`Errore nella promozione di ${user}:`, err);
        }
    }

    // Messaggio finale
    await conn.sendMessage(m.chat, { text: "Viva il comunismo, zar al rogo!" });
};

// Configurazione del comando
handler.command = /^comunismo$/i; // Comando associato
handler.group = true; // Solo per i gruppi
handler.rowner = true; // Nessun altro può usarlo
export default handler;
