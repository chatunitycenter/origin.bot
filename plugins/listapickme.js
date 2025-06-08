const handler = async (m, { conn }) => {
  const groupMetadata = await conn.groupMetadata(m.chat);
  const partecipanti = groupMetadata.participants;

  // Filtra gli utenti nella categoria "Pick-me odiosa"
  const utenti = Object.entries(global.db.data.users)
    .filter(([id, user]) => 
      user.categoria === '𝐏𝐢𝐜𝐤-𝐦𝐞 𝐨𝐝𝐢𝐨𝐬𝐚 👠' && 
      partecipanti.find(p => p.id === id)
    )
    .map(([id]) => ({ id, text: `@${id.split('@')[0]}` }));

  // Crea il messaggio in base alla presenza di utenti
  const messaggio = utenti.length > 0 
    ? `⪨ 👠 𝕃𝕚𝕤𝕥𝕒 𝕕𝕖𝕝𝕝𝕖 𝕡𝕚𝕔𝕜-𝕞𝕖 𝕠𝕕𝕚𝕠𝕤𝕖 👠 ⪩\n\n ${utenti.map(u => `► ${u.text}`).join('\n')}`
    : `⪨ 👠 𝕃𝕚𝕤𝕥𝕒 𝕕𝕖𝕝𝕝𝕖 𝕡𝕚𝕔𝕜-𝕞𝕖 𝕠𝕕𝕚𝕠𝕤𝕖 👠 ⪩\n\n> 𝑵𝒆𝒔𝒔𝒖𝒏 𝒖𝒕𝒆𝒏𝒕𝒆 𝒊𝒏 𝒍𝒊𝒔𝒕𝒂 ✘ `;

  // Immagine fissa
  const fixedImageUrl = "https://qu.ax/GyaPH.png";
  const profileBuffer = await (await fetch(fixedImageUrl)).buffer();

  // Invia il messaggio con immagine e scritta in miniatura
  conn.sendMessage(m.chat, { 
    text: messaggio, 
    mentions: utenti.map(u => u.id)
  }, { 
    quoted: {
      key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
      message: {
        locationMessage: {
          name: "𝑪𝒂𝒕𝒆𝒈𝒐𝒓𝒊𝒂 𝒑𝒊𝒄𝒌-𝒎𝒆 👠",
          jpegThumbnail: profileBuffer,
        },
      },
      participant: "0@s.whatsapp.net",
    },
  });
};

handler.command = /^(listapickme)$/i;
export default handler;