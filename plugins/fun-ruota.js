// Crediti Onix di Riad
import Jimp from 'jimp';

let handler = async (m, { conn }) => {
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';

    if (!mime || !/image\/(jpe?g|png)/.test(mime)) {
      return m.reply('✯ Rispondi a un\'immagine JPEG o PNG.');
    }

    let imgBuffer = await q.download();
    if (!imgBuffer) return m.reply('✯ Errore nel download dell\'immagine.');

    let image = await Jimp.read(imgBuffer);

    image.rotate(-90); 

    let buffer = await image.getBufferAsync(Jimp.MIME_JPEG);
    await conn.sendMessage(m.chat, { image: buffer }, { quoted: m });
  } catch (e) {
    console.error("Errore nel comando .ruota:", e); 
    m.reply('✯ C\'è stato un errore nel processo.');
  }
};

handler.command = /^ruota$/i;
handler.help = ['ruota'];
handler.tags = ['fun'];

export default handler;