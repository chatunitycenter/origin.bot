const handler = async (m, { conn }) => {
  const groupMetadata = await conn.groupMetadata(m.chat);
  const partecipanti = groupMetadata.participants;

  const utenti = Object.entries(global.db.data.users)
    .filter(([id, user]) => 
      user.categoria === '𝐇𝐚𝐧𝐝𝐢𝐜𝐚𝐩𝐩𝐚𝐭𝐨 ♿' && 
      partecipanti.find(p => p.id === id)
    )
    .map(([id]) => ({ id, text: `@${id.split('@')[0]}` }));

  const messaggio = utenti.length > 0 
    ? `⪨ ♿ 𝕃𝕚𝕤𝕥𝕒 𝕕𝕖𝕚 𝟙𝟘𝟜 ♿ ⪩\n\n ${utenti.map(u => `► ${u.text}`).join('\n')}`
    : `⪨ ♿ 𝕃𝕚𝕤𝕥𝕒 𝕕𝕖𝕚 𝟙𝟘𝟜 ♿ ⪩\n\n> 𝑵𝒆𝒔𝒔𝒖𝒏 𝒖𝒕𝒆𝒏𝒕𝒆 𝒊𝒏 𝒍𝒊𝒔𝒕𝒂 ✘ `;

  const fixedImageUrl = "https://qu.ax/cGzOJ.png";
  const profileBuffer = await (await fetch(fixedImageUrl)).buffer();

  conn.sendMessage(m.chat, { 
    text: messaggio, 
    mentions: utenti.map(u => u.id)
  }, { 
    quoted: {
      key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
      message: {
        locationMessage: {
          name: "𝑪𝒂𝒕𝒆𝒈𝒐𝒓𝒊𝒂 𝒉𝒂𝒏𝒅𝒊𝒄𝒂𝒑𝒑𝒂𝒕𝒊 ♿",
          jpegThumbnail: profileBuffer,
        },
      },
      participant: "0@s.whatsapp.net",
    },
  });
};

handler.command = /^(lista104)$/i;
export default handler;