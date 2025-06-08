//crediti Onix di Riad
let handler = m => m;

handler.all = async function (m) {
  try {
    if (m.sender === conn.user.jid) return;

    const responses = {
      '639649477630@s.whatsapp.net': '𝐒𝐭𝐚𝐢 𝐫𝐨𝐦𝐩𝐞𝐧𝐝𝐨 𝐮𝐧 𝐩𝐨` 𝐭𝐫𝐨𝐩𝐩𝐨 𝐢𝐥 𝐜𝐚𝐳𝐳𝐨 𝐚 𝐑𝐢𝐚𝐝, 𝐧𝐨𝐧 𝐜𝐫𝐞𝐝𝐢?',
      '393492677786@s.whatsapp.net': '𝐒𝐭𝐚𝐫𝐚̀ 𝐬𝐯𝐮𝐨𝐭𝐚𝐧𝐝𝐨 𝐪𝐮𝐚𝐥𝐜𝐡𝐞 𝐠𝐫𝐮𝐩𝐩𝐨, 𝐥𝐚𝐬𝐜𝐢𝐚𝐥𝐨 𝐮𝐧 𝐩𝐨\' 𝐢𝐧 𝐩𝐚𝐜𝐞',
      '393472985240@s.whatsapp.net': '𝐋𝐚𝐬𝐜𝐢𝐚𝐥𝐨 𝐢𝐧 𝐩𝐚𝐜𝐞, 𝐬𝐭𝐚𝐫𝐚\' 𝐬𝐜𝐨𝐩𝐚𝐧𝐝𝐨 𝐃𝐞𝐦𝐞𝐭𝐫𝐚 𝐨𝐫𝐚 𝐜𝐨𝐦𝐞 𝐨𝐫𝐚.',
      '447365589428@s.whatsapp.net': '𝐒𝐮𝐥 𝐬𝐞𝐫𝐢𝐨, 𝐭𝐚𝐠𝐠𝐡𝐢 𝐃𝐞𝐚𝐭𝐡?? 𝐒𝐞𝐢 𝐦𝐨𝐫𝐭𝐨 𝐟𝐫𝐚',
      '393516581971@s.whatsapp.net': '𝐌𝐚 𝐜𝐡𝐞 𝐜𝐚𝐳𝐳𝐨 𝐯𝐮𝐨𝐢? 𝐋𝐨 𝐭𝐚𝐠𝐠𝐡𝐢 𝐬𝐨𝐥𝐨 𝐩𝐞𝐫 𝐟𝐚𝐫𝐠𝐥𝐢 𝐫𝐨𝐦𝐩𝐞𝐫𝐞 𝐢 𝐜𝐨𝐠𝐥𝐢𝐨𝐧𝐢?',
      '393335608801@s.whatsapp.net': 'Lascia perdere il mio owner, scrivigli su ig:\ninstagram.com/il_mulatto07',
    };

    
    let mentioned = m.mentionedJid || [];

    if (mentioned.includes(conn.user.jid)) {
      return; 
    }

 
    let taggedNumbers = mentioned.filter(jid => responses[jid]);


    if (taggedNumbers.length === 0 || m.fromMe) return;


    if (taggedNumbers.length === 1) {
      let responseMessage = responses[taggedNumbers[0]];
      await conn.reply(m.chat, responseMessage, m, { quoted: m });
    } 
    else if (taggedNumbers.length > 1) {
      let responseMessage = `𝐂𝐨𝐦𝐞 𝐨𝐬𝐢 𝐭𝐚𝐠𝐠𝐚𝐫𝐞 ${taggedNumbers.length} 𝐨𝐰𝐧𝐞𝐫𝐬 𝐚𝐥𝐥𝐨 𝐬𝐭𝐞𝐬𝐬𝐨 𝐭𝐞𝐦𝐩𝐨? 👿`;
      await conn.reply(m.chat, responseMessage, m, { quoted: m });
    }
  } catch (error) {
    console.error('𝐄𝐫𝐫𝐨𝐫𝐞 ⚠️', error);
  }

  return !0;
};

export default handler;