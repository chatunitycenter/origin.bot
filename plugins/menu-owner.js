import os from 'os';
import util from 'util';
import humanReadable from 'human-readable';
import { default as makeWASocket } from '@whiskeysockets/baileys';
import { promises as fs } from 'fs';
import { performance } from 'perf_hooks';

let handler = async (m, { conn, usedPrefix }) => {
  const botName = global.db.data.nomedelbot || "ᴼʳⁱᵍⁱⁿ ᴮᵒᵗ✦";
  const commandList = `
────────────────────────
✦ *𝐏𝐀𝐍𝐍𝐄𝐋𝐋𝐎 𝐌𝐎𝐃𝐄𝐑𝐀𝐓𝐎𝐑𝐄* ✦
────────────────────────
⤷ *Comandi disponibili:*

➤ ${usedPrefix}𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐧𝐨𝐦𝐞
➤ ${usedPrefix}𝐫𝐞𝐬𝐞𝐭𝐭𝐚𝐧𝐨𝐦𝐞
➤ ${usedPrefix}𝐠𝐞𝐬𝐭𝐢𝐬𝐜𝐢 @
➤ ${usedPrefix}𝐬𝐞𝐭𝐠𝐫𝐮𝐩𝐩𝐢
➤ ${usedPrefix}𝐚𝐠𝐠𝐢𝐮𝐧𝐠𝐢𝐠𝐫𝐮𝐩𝐩𝐢 @
➤ ${usedPrefix}𝐫𝐞𝐬𝐞𝐭𝐠𝐫𝐮𝐩𝐩𝐢 @
➤ ${usedPrefix}𝐬𝐞𝐭𝐩𝐩 (𝐢𝐦𝐦𝐚𝐠𝐢𝐧𝐞)
➤ ${usedPrefix}𝐛𝐚𝐧𝐮𝐬𝐞𝐫 @
➤ ${usedPrefix}𝐮𝐧𝐛𝐚𝐧𝐮𝐬𝐞𝐫 @
➤ ${usedPrefix}𝐛𝐥𝐨𝐜𝐤𝐮𝐬𝐞𝐫 @
➤ ${usedPrefix}𝐮𝐧𝐛𝐥𝐨𝐜𝐤𝐮𝐬𝐞𝐫 @
➤ ${usedPrefix}𝐩𝐮𝐥𝐢𝐳𝐢𝐚 (+)
➤ ${usedPrefix}𝐠𝐞𝐭𝐟𝐢𝐥𝐞
➤ ${usedPrefix}𝐬𝐚𝐥𝐯𝐚 (𝐩𝐥𝐮𝐠𝐢𝐧)
➤ ${usedPrefix}𝐝𝐩 (𝐩𝐥𝐮𝐠𝐢𝐧)
➤ ${usedPrefix}𝐠𝐞𝐭𝐩𝐥𝐮𝐠𝐢𝐧
➤ ${usedPrefix}𝐣𝐨𝐢𝐧 + 𝐥𝐢𝐧𝐤
➤ ${usedPrefix}𝐨𝐮𝐭
➤ ${usedPrefix}𝐩𝐫𝐞𝐟𝐢𝐬𝐬𝐨 (?)
➤ ${usedPrefix}𝐫𝐞𝐬𝐞𝐭𝐭𝐚𝐩𝐫𝐞𝐟𝐢𝐬𝐬𝐨
➤ ${usedPrefix}𝐠𝐨𝐝𝐦𝐨𝐝𝐞 {𝐚𝐮𝐭𝐨𝐚𝐝𝐦𝐢𝐧}
➤ ${usedPrefix}𝐚𝐳𝐳𝐞𝐫𝐚 @
➤ ${usedPrefix}𝐚𝐠𝐠𝐢𝐮𝐧𝐠𝐢 (𝐧𝐮𝐦. 𝐦𝐞𝐬𝐬𝐚𝐠𝐠𝐢) @
➤ ${usedPrefix}𝐫𝐢𝐦𝐮𝐨𝐯𝐢 (𝐧𝐮𝐦. 𝐦𝐞𝐬𝐬𝐚𝐠𝐠𝐢) @
────────────────────────
`;

  await conn.sendMessage(m.chat, {
    text: commandList,
    contextInfo: {
      externalAdReply: {
        title: "ᴼʳⁱᵍⁱⁿ ᴮᵒᵗ✦ - 𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔",
        body: "𝐁𝐘 𝐘𝐎𝐔𝐍𝐒 - 𝐓𝐇𝐄 𝐁𝐄𝐒𝐓",
        thumbnail: await fs.readFile('./storage/image/origin.jpg'), // Aggiungi l'immagine di anteprima
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true,
      },
     // forwardingScore: 1,
     // isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363370244642449@newsletter',
        serverMessageId: '',
        newsletterName: botName
      }
    }
  }, { quoted: m });
};

handler.help = ["menu"];
handler.tags = ['menu'];
handler.command = /^(menuowner|owner)$/i;

export default handler;

function clockString(ms) {
  const time = [
    Math.floor(ms / 3600000),
    Math.floor(ms / 60000) % 60,
    Math.floor(ms / 1000) % 60
  ].map(t => 
    t.toString().padStart(2, '0')
  ).join(':');
  return time;
}
