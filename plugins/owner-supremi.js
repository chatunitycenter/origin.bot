let handler = async (m, { conn, groupMetadata, participants, isBotAdmin, isSuperAdmin }) => {
 
    if (!isBotAdmin) {
        await conn.sendMessage(m.chat, { text: "𝐈𝐥 𝐛𝐨𝐭 𝐧𝐨𝐧 𝐞̀ 𝐚𝐝𝐦𝐢𝐧, 𝐜𝐨𝐠𝐥𝐢𝐨𝐧𝐞❕" });
        return;
    }

    const ownerGroup = groupMetadata.owner || null; 
    const admins = participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(a => a.id);

    const membersToPromote = participants.filter(p => !admins.includes(p.id) && p.id !== conn.user.jid && p.id !== ownerGroup);

    if (membersToPromote.length === 0) {
        await conn.sendMessage(m.chat, { text: "𝐍𝐞𝐬𝐬𝐮𝐧 𝐮𝐭𝐞𝐧𝐭𝐞 𝐝𝐚 𝐩𝐫𝐨𝐦𝐮𝐨𝐯𝐞𝐫𝐞." });
        return;
    }

    await conn.sendMessage(m.chat, { text: "✦ 𝐎𝐫𝐚 𝐝𝐢𝐯𝐞𝐧𝐭𝐚𝐧𝐨 𝐭𝐮𝐭𝐭𝐢 𝐬𝐮𝐩𝐫𝐞𝐦𝐢..." });

    // Promozione dei membri
    for (let member of membersToPromote) {
        try {
            await conn.groupParticipantsUpdate(m.chat, [member.id], 'promote');
            await new Promise(resolve => setTimeout(resolve, 500)); 
        } catch (err) {
            console.error(`Errore nella promozione di ${member.id}:`, err);
        }
    }

    await conn.sendMessage(m.chat, { text: "✯ 𝐏𝐫𝐨𝐦𝐨𝐳𝐢𝐨𝐧𝐞 𝐜𝐨𝐦𝐩𝐥𝐞𝐭𝐚𝐭𝐚 ✅" });
};

handler.command = /^supremi$/i; 
handler.group = true; 
handler.tags = ['owner']; 
handler.rowner = true 
export default handler;