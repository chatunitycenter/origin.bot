const handler = async (m, { conn }) => {
  const groupMetadata = await conn.groupMetadata(m.chat);
  const partecipanti = groupMetadata.participants;

  const utenti = Object.entries(global.db.data.users)
    .filter(([id, user]) => 
      user.categoria === '𝐎𝐯𝐞𝐫 40 🧓🏼' && 
      partecipanti.find(p => p.id === id)
    )
    .map(([id, user]) => ({ id, text: `@${id.split('@')[0]}` }));

  const messaggio = utenti.length > 0 
    ? `⪨ 🧓🏼 𝕃𝕚𝕤𝕥𝕒 𝕠𝕧𝕖𝕣 𝟜𝟘 🧓🏼 ⪩\n\n ${utenti.map(u => `► ${u.text}`).join('\n')}`
    : `⪨ 🧓🏼 𝕃𝕚𝕤𝕥𝕒 𝕠𝕧𝕖𝕣 𝟜𝟘 🧓🏼 ⪩\n\n> 𝑵𝒆𝒔𝒔𝒖𝒏 𝒖𝒕𝒆𝒏𝒕𝒆 𝒊𝒏 𝒍𝒊𝒔𝒕𝒂 ✘ `;

  const fixedImageUrl = "https://qu.ax/ZOfBN.png";
  const profileBuffer = await (await fetch(fixedImageUrl)).buffer();

  conn.sendMessage(m.chat, { 
    text: messaggio, 
    mentions: utenti.map(u => u.id)
  }, { 
    quoted: {
      key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
      message: {
        locationMessage: {
          name: "𝑪𝒂𝒕𝒆𝒈𝒐𝒓𝒊𝒂 𝒐𝒗𝒆𝒓 𝟒𝟎 🧓🏼",
          jpegThumbnail: profileBuffer,
        },
      },
      participant: "0@s.whatsapp.net",
    },
  });
};

handler.command = /^(listaover40)$/i;
export default handler;