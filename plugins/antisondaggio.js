//antisondaggi di Onix, di Riad
export async function before(m, { isAdmin, isBotAdmin, conn }) {
    if (!m.isGroup || m.isBaileys) return true;

    let chat = global.db.data.chats[m.chat];
    if (!chat.antisondaggi) return true;

    const msgType = Object.keys(m.message || {})[0];

    const isPoll =
        msgType === 'pollCreationMessage' ||
        msgType === 'pollCreationMessageV2' ||
        msgType === 'pollCreationMessageV3';

    if (isPoll && !isAdmin) {
        // elimina il sondaggio
        try {
            await conn.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant || m.sender
                }
            });

            // messaggio di avviso
            await conn.sendMessage(m.chat, {
                text: `> ⚠️ 𝐒𝐎𝐍𝐃𝐀𝐆𝐆𝐈𝐎 𝐑𝐈𝐋𝐄𝐕𝐀𝐓𝐎 ⚠️\n𝐈𝐥 𝐬𝐨𝐧𝐝𝐚𝐠𝐠𝐢𝐨 𝐝𝐢 @${m.sender.split('@')[0]} 𝐞̀ 𝐬𝐭𝐚𝐭𝐨 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐭𝐨.`,
                mentions: [m.sender]
            });
        } catch (e) {
            console.error("Errore:", e);
        }
    }

    return true;
}