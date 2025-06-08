//crediti: Onix, di Riad
let handler = async (m, { conn, participants }) => {
    if (m.fromMe) return;

    let chat = global.db.data.chats[m.chat] || {};
    if (chat.antisbura) return;

    let sender = m.sender;
    let groupMembers = participants.map(p => p.id).filter(id => id !== sender && id !== conn.user.jid);

    if (groupMembers.length === 0) {
        return m.reply("Non ci sono abbastanza membri nel gruppo per eseguire questo comando!");
    }

    let randomUser = groupMembers[Math.floor(Math.random() * groupMembers.length)];

    let message = `> 𝐌𝐨𝐦𝐞𝐧𝐭𝐨 𝐬𝐛𝐨𝐫𝐫𝐚𝐭𝐚 𝐝𝐢 @${sender.split('@')[0]} 😏 \n @${sender.split('@')[0]} 𝐬𝐭𝐚 𝐬𝐛𝐨𝐫𝐫𝐚𝐧𝐝𝐨 𝐧𝐞𝐥𝐥𝐚 𝐛𝐨𝐜𝐜𝐚 𝐝𝐢  @${randomUser.split('@')[0]}  💦 \n`;

    await conn.sendMessage(m.chat, { text: message, mentions: [sender, randomUser] }, { quoted: m });
}

handler.customPrefix = /sborr|sburr/i;
handler.command = new RegExp();
export default handler;