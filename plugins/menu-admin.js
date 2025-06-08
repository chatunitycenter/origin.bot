import os from 'os';
import util from 'util';
import humanReadable from 'human-readable';
import { default as makeWASocket } from '@whiskeysockets/baileys';
import { promises as fs } from 'fs';
import { performance } from 'perf_hooks';

let handler = async (m, { conn, usedPrefix }) => {
  const botName = global.db.data.nomedelbot || "ᴼʳⁱᵍⁱⁿ ᴮᵒᵗ✦";
  
  const adminMenu = `
════════════════════
          👑 *𝐌𝐞𝐧𝐮 𝐀𝐝𝐦𝐢𝐧* 👑
════════════════════

➤ ${usedPrefix}𝐩𝐫𝐨𝐦𝐮𝐨𝐯𝐢 / 𝐦𝐞𝐭𝐭𝐢𝐚𝐝𝐦𝐢𝐧
➤ ${usedPrefix}𝐫𝐞𝐭𝐫𝐨𝐜𝐞𝐝𝐢 / 𝐭𝐨𝐠𝐥𝐢𝐚𝐝𝐦𝐢𝐧
➤ ${usedPrefix}𝐰𝐚𝐫𝐧 / 𝐮𝐧𝐰𝐚𝐫𝐧
➤ ${usedPrefix}𝐦𝐮𝐭𝐚 / 𝐬𝐦𝐮𝐭𝐚
➤ ${usedPrefix}𝐡𝐢𝐝𝐞𝐭𝐚𝐠
➤ ${usedPrefix}𝐭𝐚𝐠𝐚𝐥𝐥 / 𝐦𝐚𝐫𝐜𝐚𝐫
➤ ${usedPrefix}𝐩𝐚𝐫𝐥𝐚𝐭𝐞 / 𝐳𝐢𝐭𝐭𝐢
➤ ${usedPrefix}𝐬𝐞𝐭𝐰𝐞𝐥𝐜𝐨𝐦𝐞
➤ ${usedPrefix}𝐬𝐞𝐭𝐛𝐲𝐞
➤ ${usedPrefix}𝐢𝐧𝐚𝐭𝐭𝐢𝐯𝐢
➤ ${usedPrefix}𝐥𝐢𝐬𝐭𝐚𝐧𝐮𝐦 + 𝐩𝐫𝐞𝐟𝐢𝐬𝐬𝐨
➤ ${usedPrefix}𝐩𝐮𝐥𝐢𝐳𝐢𝐚 + 𝐩𝐫𝐞𝐟𝐢𝐬𝐬𝐨

════════════════════
`.trim();

  // Invia il messaggio con una grafica migliorata
  await conn.sendMessage(m.chat, {
    text: adminMenu,
    contextInfo: {
      externalAdReply: {
        title: "ᴼʳⁱᵍⁱⁿ ᴮᵒᵗ✦ - 𝐌𝐄𝐍𝐔 𝐀𝐃𝐌𝐈𝐍",
        body: "𝐁𝐘 𝐘𝐎𝐔𝐍𝐒 - 𝐓𝐇𝐄 𝐁𝐄𝐒𝐓",
        thumbnail: await fs.readFile('./storage/image/origin.jpg'), // Assicurati che l'immagine sia disponibile
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

handler.help = ["menuadm", "admin"];
handler.tags = ['menu'];
handler.command = /^(menuadm|admin)$/i;

export default handler;
