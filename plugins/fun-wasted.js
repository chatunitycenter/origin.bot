// Crediti, Onix di Riad
import jimp from 'jimp';

let handler = async (m, { conn, text }) => {
  try {

    let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;

    let avatarUrl;
    try {
      avatarUrl = await conn.profilePictureUrl(who, 'image');
    } catch (e) {
      return conn.sendMessage(m.chat, {
        text: `𝐋'𝐮𝐭𝐞𝐧𝐭𝐞 𝐧𝐨𝐧 𝐡𝐚 𝐮𝐧𝐚 𝐟𝐨𝐭𝐨 𝐩𝐫𝐨𝐟𝐢𝐥𝐨 ✖`
      }, { quoted: m });
    }

    let img = await jimp.read('https://qu.ax/FacQz.png'); 
    let avatar = await jimp.read(avatarUrl);


    const avatarSize = 450;
    avatar = avatar.resize(avatarSize, avatarSize);

    const imgWidth = img.bitmap.width;
    const imgHeight = img.bitmap.height;
    const avatarX = (imgWidth - avatarSize) / 2; 
    const avatarY = (imgHeight - avatarSize) / 2; 


    let finalImage = await img.composite(avatar, avatarX, avatarY, {
      mode: 'dstOver',
      opacitySource: 1,
      opacityDest: 1
    }).getBufferAsync('image/png');


    await conn.sendMessage(m.chat, { image: finalImage }, { quoted: m });

  } catch (e) {

  }
};

handler.command = /^(wasted)$/i;

export default handler;