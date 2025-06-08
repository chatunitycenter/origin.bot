import fetch from 'node-fetch';
import { promises as fs } from 'fs';

let handler = async (m, { conn, usedPrefix, command, args }) => {
    const chat = global.db.data.chats[m.chat];

    const featureMap = {
        'antiinsta': '𝐚𝐧𝐭𝐢𝐢𝐧𝐬𝐭𝐚',
        'antilink': '𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤',
        'modoadmin': '𝐦𝐨𝐝𝐨𝐚𝐝𝐦𝐢𝐧',
        'antifroci': '𝐚𝐧𝐭𝐢𝐟𝐫𝐨𝐜𝐢',
        'strillo': '𝐬𝐭𝐫𝐢𝐥𝐥𝐨',
        'antitiktok': '𝐚𝐧𝐭𝐢𝐭𝐢𝐤𝐭𝐨𝐤',
        'stickers': '𝐬𝐭𝐢𝐜𝐤𝐞𝐫𝐬',
        'welcome': '𝐛𝐞𝐧𝐯𝐞𝐧𝐮𝐭𝐨',
        'antigiochi': '𝐚𝐧𝐭𝐢𝐠𝐢𝐨𝐜𝐡𝐢',
        'antilinktotale': '𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤𝐭𝐨𝐭𝐚𝐥𝐞',
        'sologruppo': '𝐬𝐨𝐥𝐨𝐠𝐫𝐮𝐩𝐩𝐨',
        'antilinkch': '𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤𝐜𝐡',
        'antisbura': '𝐚𝐧𝐭𝐢𝐬𝐛𝐮𝐫𝐚',
        'soloprivato': '𝐬𝐨𝐥𝐨𝐩𝐫𝐢𝐯𝐚𝐭𝐨',
        'antimedia': '𝐚𝐧𝐭𝐢𝐦𝐞𝐝𝐢𝐚',
        'antipaki': '𝐚𝐧𝐭𝐢𝐩𝐚𝐤𝐢',
    };

    if (args[0]) {
        const key = args[0].toLowerCase();
        if (featureMap[key] !== undefined) chat[key] = !chat[key];
    }

    const stato = (v) => v ? '✅' : '❌';
    const botName = global.db.data.nomedelbot || "ᴼʳⁱᵍⁱⁿ ᴮᵒᵗ✦";

    const statusList = Object.entries(featureMap).map(([key, name]) => `┃   ${stato(chat[key])} ${name}`).join('\n');

    const text = `
╭━━━❰ *𝐌𝐞𝐧𝐮 𝐅𝐮𝐧𝐳𝐢𝐨𝐧𝐢* ❱━━━⬣
${statusList}
╰━━━━━━━━━━━━━━━━━━⬣

💡 *𝐈𝐧𝐟𝐨 𝐬𝐭𝐚𝐭𝐮𝐬:*
- ✅ » *𝐀𝐭𝐭𝐢𝐯𝐚𝐭𝐨*
- ❌ » *𝐃𝐢𝐬𝐚𝐭𝐭𝐢𝐯𝐚𝐭𝐨*

💬 *𝐂𝐨𝐦𝐚𝐧𝐝𝐢 𝐔𝐭𝐢𝐥𝐢:*
» ${usedPrefix}attiva <funzione>
» ${usedPrefix}disabilita <funzione>
» ${usedPrefix}infostato
`.trim();

    await conn.sendMessage(m.chat, {
        text,
        contextInfo: {
            externalAdReply: {
                title: "ᴼʳⁱᵍⁱⁿ ᴮᵒᵗ✦ - 𝐌𝐄𝐍𝐔 𝐅𝐔𝐍𝐙𝐈𝐎𝐍𝐈",
                body: "𝐁𝐘 𝐘𝐎𝐔𝐍𝐒 - 𝐓𝐇𝐄 𝐁𝐄𝐒𝐓",
                thumbnail: await fs.readFile('./storage/image/origin.jpg'),
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true,
            },
          //  forwardingScore: 1,
           // isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363370244642449@newsletter',
                serverMessageId: '',
                newsletterName: botName
            }
        }
    }, { quoted: m });
};

handler.help = ['funzioni'];
handler.tags = ['menu'];
handler.command = /^(funzioni)$/i;

export default handler;
