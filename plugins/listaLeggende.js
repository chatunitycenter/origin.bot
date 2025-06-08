const handler = async (m, { conn }) => {
  const groupMetadata = await conn.groupMetadata(m.chat);
  const partecipanti = groupMetadata.participants;

  const utenti = Object.entries(global.db.data.users)
    .filter(([id, user]) => 
      user.categoria === '𝐋𝐞𝐠𝐠𝐞𝐧𝐝𝐚 𝐯𝐢𝐯𝐞𝐧𝐭𝐞 💯' && 
      partecipanti.find(p => p.id === id)
    )
    .map(([id]) => ({ id, text: `@${id.split('@')[0]}` }));

  const messaggio = utenti.length > 0 
    ? `⪨ 💯 𝕃𝕚𝕤𝕥𝕒 𝕕𝕖𝕝𝕝𝕖 𝕃𝕖𝕘𝕘𝕖𝕟𝕕𝕖 𝕍𝕚𝕧𝕖𝕟𝕥𝕚 💯 ⪩\n\n ${utenti.map(u => `► ${u.text}`).join('\n')}`
    : `⪨ 💯 𝕃𝕚𝕤𝕥𝕒 𝕕𝕖𝕝𝕝𝕖 𝕃𝕖𝕘𝕘𝕖𝕟𝕕𝕖 𝕍𝕚𝕧𝕖𝕟𝕥𝕚 💯 ⪩\n\n> 𝑵𝒆𝒔𝒔𝒖𝒏 𝒖𝒕𝒆𝒏𝒕𝒆 𝒊𝒏 𝒍𝒊𝒔𝒕𝒂 ✘ `;

  const fixedImageUrl = "https://qu.ax/BCCrW.png";
  const profileBuffer = await (await fetch(fixedImageUrl)).buffer();

  conn.sendMessage(m.chat, { 
    text: messaggio, 
    mentions: utenti.map(u => u.id)
  }, { 
    quoted: {
      key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
      message: {
        locationMessage: {
          name: "𝑪𝒂𝒕𝒆𝒈𝒐𝒓𝒊𝒂 𝒍𝒆𝒈𝒈𝒆𝒏𝒅𝒆 💯",
          jpegThumbnail: profileBuffer,
        },
      },
      participant: "0@s.whatsapp.net",
    },
  });
};

handler.command = /^(listaleggende)$/i;
export default handler;