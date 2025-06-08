import os from 'os';
import util from 'util';
import humanReadable from 'human-readable';
import { default as makeWASocket } from '@whiskeysockets/baileys';
import { promises as fs } from 'fs';
import { performance } from 'perf_hooks';

let handler = async (m, { conn, usedPrefix }) => {
  const botName = global.db.data.nomedelbot || "ᴼʳⁱᵍⁱⁿ ᴮᵒᵗ✦";
  const commandList = `
✦ *𝐂𝐎𝐌𝐀𝐍𝐃𝐈 𝐃𝐄𝐋 𝐁𝐎𝐓* ✦
────────────────────────
➤ ${usedPrefix}𝐩𝐫𝐨𝐩𝐫𝐢𝐞𝐭𝐚𝐫𝐢𝐨
➤ ${usedPrefix}𝐟𝐮𝐧𝐳𝐢𝐨𝐧𝐢
➤ ${usedPrefix}𝐚𝐝𝐦𝐢𝐧
➤ ${usedPrefix}𝐠𝐫𝐮𝐩𝐩𝐨
➤ ${usedPrefix}𝐨𝐰𝐧𝐞𝐫
➤ ${usedPrefix}𝐬𝐜𝐫𝐢𝐩𝐭
➤ ${usedPrefix}𝐢𝐧𝐬𝐭𝐚𝐥𝐥𝐚
➤ ${usedPrefix}𝐜𝐫𝐞𝐝𝐢𝐭𝐢
────────────────────────
${botName}  -  𝐕𝐄𝐑𝐒𝐈𝐎𝐍𝐄: ${vs}
`.trim();

  await conn.sendMessage(m.chat, {
    text: commandList,
    contextInfo: {
      externalAdReply: {
        title: "ᴼʳⁱᵍⁱⁿ ᴮᵒᵗ✦ - 𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔",
        body: "𝐁𝐘 𝐘𝐎𝐔𝐍𝐒 - 𝐓𝐇𝐄 𝐁𝐄𝐒𝐓",
        thumbnail: await fs.readFile('./storage/image/origin.jpg'),
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
handler.command = /^(menu|comandi)$/i;

export default handler;

function clockString(ms) {
  const time = [
    Math.floor(ms / 3600000),
    Math.floor(ms / 60000) % 60,
    Math.floor(ms / 1000) % 60
  ].map(t => t.toString().padStart(2, '0')).join(':');
  return time;
}