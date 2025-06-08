const handler = async (m, { conn, command, isOwner, args }) => {
    if (!isOwner) {
        return conn.reply(m.chat, 'Questo comando è riservato al proprietario del bot.', m);
    }

    if (command === 'join') {
        if (!args[0]) {
            return conn.reply(m.chat, '𝐋𝐢𝐧𝐤 𝐦𝐚𝐧𝐜𝐚𝐧𝐭𝐞 ✘ .', m);
        }

        try {
            const linkRegex = /(https?:\/\/)?chat\.whatsapp\.com\/(?:invite\/)?([a-zA-Z0-9_-]{22})/i;
            const match = args[0].match(linkRegex); // Ottieni il risultato di match()

            if (!match) { // Controlla se match è null
                return conn.reply(m.chat, 'Link non valido.', m);
            }

            const code = match[2]; // Accedi al codice solo se match non è null

            try {
                await conn.groupAcceptInvite(code);
                conn.reply(m.chat, '𝐑𝐢𝐜𝐡𝐢𝐞𝐬𝐭𝐚 𝐦𝐚𝐧𝐝𝐚𝐭𝐚 𝐚𝐥 𝐠𝐫𝐮𝐩𝐩𝐨 ✓ ', m);
            } catch (err) {
                console.error("Errore nell'entrare nel gruppo:", err);
                // ... (gestione degli errori)
            }

        } catch (e) {
            conn.reply(m.chat, '𝐄𝐫𝐫𝐨𝐫𝐞 ⚠️', m);
            console.error(e)
        }
    }
};

handler.command = /^(join)$/i;
handler.owner = true;

export default handler;