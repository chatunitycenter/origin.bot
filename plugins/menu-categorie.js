import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';

let handler = async (_0x512ed3, { conn: _0x542b94, usedPrefix: _0x3f73c1 }) => {
  const { welcome: _0x16d809, detect: _0x4c3a9f } = global.db.data.chats[_0x512ed3.chat];
  let _0x5bfb0b = _0x512ed3.quoted ? _0x512ed3.quoted.sender : _0x512ed3.mentionedJid && _0x512ed3.mentionedJid[0] ? _0x512ed3.mentionedJid[0] : _0x512ed3.fromMe ? _0x542b94.user.jid : _0x512ed3.sender;
  const _0x197a8a = (await _0x542b94.profilePictureUrl(_0x5bfb0b, "image").catch(_0x2cb040 => null)) || "./src/avatar_contact.png";

  let _0x53e6f1;
  if (_0x197a8a !== "./src/avatar_contact.png") {
    _0x53e6f1 = await (await fetch(_0x197a8a)).buffer();
  } else {
    _0x53e6f1 = await (await fetch("https://qu.ax/NGCAQ.png")).buffer();
  }

  let _0x6bd16e = {
    'key': {
      'participants': "0@s.whatsapp.net",
      'fromMe': false,
      'id': "Halo"
    },
    'message': {
      'locationMessage': {
        'name': "𝐜𝐚𝐭𝐞𝐠𝐨𝐫𝐢𝐞 ",
        'jpegThumbnail': await (await fetch("https://files.catbox.moe/dm1oog.png")).buffer()
      }
    },
    'participant': "0@s.whatsapp.net"
  };

  let _0x2aa101 = `
           
ↆ      *𝐋𝐢𝐬𝐭𝐚 𝐜𝐚𝐭𝐞𝐠𝐨𝐫𝐢𝐞 𝐝𝐞𝐥𝐥𝐚 𝐢𝐧𝐟𝐨*     ↆ

𝑽𝒊𝒑 💎  
𝑪𝒐𝒍𝒍𝒂𝒃𝒐𝒓𝒂𝒕𝒐𝒓𝒆 🤝🏼  
𝑴𝒐𝒅𝒆𝒓𝒂𝒕𝒐𝒓𝒆 🚨  
𝑨𝒏𝒅𝒊𝒄𝒂𝒑𝒑𝒂𝒕𝒐 ♿️  
𝑺𝒆𝒎𝒑𝒍𝒊𝒄𝒆𝒎𝒆𝒏𝒕𝒆 𝑻𝑹𝑶𝑰𝑨 🤢  
𝑳𝒆𝒈𝒈𝒆𝒏𝒅𝒂 𝒗𝒊𝒗𝒆𝒏𝒕𝒆 💯  
𝑶𝒗𝒆𝒓 40 🧓🏼  
𝑪𝒐-𝒐𝒘𝒏𝒆𝒓 𝒅𝒊 𝑶𝒓𝒊𝒈𝒊𝒏 ✦  
𝑶𝒘𝒏𝒆𝒓 𝒅𝒊 𝑶𝒓𝒊𝒈𝒊𝒏 ✦  
𝑵𝒆𝒈𝒓𝒂 👰🏿  
𝑵𝒆𝒈𝒓𝒐 👨🏿  
𝑩𝒊𝒂𝒏𝒄𝒐 👨🏻  
𝑩𝒊𝒂𝒏𝒄𝒂 👰🏻‍♀️  
𝑷𝒊𝒛𝒛𝒂𝒊𝒐𝒍𝒐 𝒃𝒊𝒂𝒏𝒄𝒐 🍕  
𝑮𝒊𝒈𝒂𝒄𝒉𝒂𝒅 🗿  
𝑽𝒆𝒕𝒆𝒓𝒂𝒏𝒐 ⭐  
𝑽𝒆𝒕𝒆𝒓𝒂𝒏𝒂 ⭐  
𝑷𝒊𝒄𝒌-𝒎𝒆 𝒐𝒅𝒊𝒐𝒔𝒂 👠  
𝑪𝒂𝒔𝒐 𝒖𝒎𝒂𝒏𝒐 💩  
𝑫𝒐𝒓𝒎𝒊𝒈𝒍𝒊𝒐𝒏𝒆 𝒊𝒏𝒂𝒕𝒕𝒊𝒗𝒐 😴  
𝑴𝒐𝒓𝒕𝒐 𝒅𝒊 𝒇𝒊𝒈𝒂 👽  
𝑲𝒆𝒃𝒂𝒃𝒃𝒂𝒓𝒐 𝒏𝒆𝒈𝒓𝒐 🥙  
𝑪𝒖𝒈𝒊𝒏𝒐/𝒂 𝒅𝒊 𝑪𝒂𝒓𝒍𝒂 👩🏿‍🦱  
✦ 𝑩𝒐𝒕 ✦  

> 𝐿𝑎 𝑙𝑖𝑠𝑡𝑎 𝑒̇ 𝑐𝑜𝑛𝑡𝑖𝑛𝑢𝑎𝑚𝑒𝑛𝑡𝑒 𝑖𝑛 𝑎𝑔𝑔𝑖𝑜𝑟𝑛𝑎𝑚𝑒𝑛𝑡𝑜…


  `.trim();

  _0x542b94.sendMessage(_0x512ed3.chat, { text: _0x2aa101 }, { quoted: _0x6bd16e });
};

handler.help = ["menu"];
handler.tags = ["menu"];
handler.command = /^(categorie)$/i;

export default handler;