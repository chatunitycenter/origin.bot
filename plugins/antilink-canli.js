//antilink-canali di Onix, di Riad. Fanculo le bambine con i loro canali🖕🏼🖕🏼🖕🏼

const channelLinkRegex = /whatsapp\.com\/(?:channel|broadcast)\/[0-9A-Za-z]{20,}/i;
const maxWarn = 4;

export async function before(m, { isAdmin, isBotAdmin, conn }) {
    if (!m.isGroup || m.isBaileys) return true;

    let chat = global.db.data.chats[m.chat];
    if (!chat.antilinkch) return true;

    if (channelLinkRegex.test(m.text)) {
        if (isAdmin) return true; // Ignora se è un admin

        const user = global.db.data.users[m.sender];
        user.warn = user.warn || 0;

        // Se l'utente ha già raggiunto il massimo dei warn, lo rimuoviamo subito
        if (user.warn >= maxWarn) {
            await conn.sendMessage(
                m.chat,
                {
                    text: `⛔ @${m.sender.split('@')[0]} 𝐡𝐚 𝐫𝐚𝐠𝐠𝐢𝐮𝐧𝐭𝐨 𝐢 ${maxWarn} 𝐰𝐚𝐫𝐧, e 𝐨𝐫𝐚 𝐞̀ 𝐟𝐮𝐨𝐫𝐢 𝐝𝐚𝐥𝐥𝐞 𝐩𝐚𝐥𝐥𝐞.`,
                    mentions: [m.sender]
                }
            );
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            return true;
        }

        // Incrementa il warn
        user.warn += 1;

        // Elimina il messaggio incriminato
        await conn.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: m.key.id,
                participant: m.key.participant || m.sender
            }
        });

        // Avviso + warn
        await conn.sendMessage(
            m.chat,
            {
                text: `⚠️ 𝐋𝐈𝐍𝐊 𝐂𝐀𝐍𝐀𝐋𝐄 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 𝐑𝐈𝐋𝐄𝐕𝐀𝐓𝐎!\n@${m.sender.split('@')[0]} 𝐞̇ 𝐬𝐭𝐚𝐭𝐨 𝐦𝐮𝐭𝐚𝐭𝐨 𝐞 𝐰𝐚𝐫𝐧𝐚𝐭𝐨.\n> ⚠️ 𝐖𝐚𝐫𝐧 𝐝𝐢 @${m.sender.split('@')[0]} : *${user.warn} 𝐬𝐮 ${maxWarn}*`,
                mentions: [m.sender]
            }
        );

        
        user.muto = true;

        

        // Se ha raggiunto il massimo dei warn, rimuovilo
        if (user.warn >= maxWarn) {
            user.warn = 0;  // Resetta il warn
            await conn.sendMessage(
                m.chat,
                {
                    text: `⛔ @${m.sender.split('@')[0]} ha raggiunto ${maxWarn} warn ed è stato rimosso dal gruppo.`,
                    mentions: [m.sender]
                }
            );
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
        }

        
        conn.on('chat-update', async (chatUpdate) => {
            if (chatUpdate.messages && chatUpdate.count) {
                const message = chatUpdate.messages.all()[0];
                if (message && message.sender === m.sender) {
                    await conn.sendMessage(m.chat, {
                        delete: {
                            remoteJid: m.chat,
                            fromMe: false,
                            id: message.key.id,
                            participant: m.sender
                        }
                    });
                }
            }
        });

    }

    return true;
}