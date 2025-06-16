import { promises as fs } from 'fs';

let handler = async (m, { conn }) => {
  const image = await fs.readFile('./storage/image/copertina.jpg');
  const caption = '𝐂𝐎𝐏𝐄𝐑𝐓𝐈𝐍𝐀\n𝐁𝐘 𝐌𝐀𝐓𝐓𝐄';

  await conn.sendMessage(m.chat, {
    image: image,
    caption: caption,
  }, { quoted: m });
};

handler.help = ['copertina'];
handler.tags = ['info'];
handler.command = /^copertina$/i;

export default handler;