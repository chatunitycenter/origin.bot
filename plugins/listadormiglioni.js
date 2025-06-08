const handler = async (m, { conn }) => {
  const groupMetadata = await conn.groupMetadata(m.chat);
  const partecipanti = groupMetadata.participants;

  const utenti = Object.entries(global.db.data.users)
    .filter(([id, user]) => 
      user.categoria === '𝐃𝐨𝐫𝐦𝐢𝐠𝐥𝐢𝐨𝐧𝐞 𝐢𝐧𝐚𝐭𝐭𝐢𝐯𝐨 😴' && 
      partecipanti.find(p => p.id === id)
    )
    .map(([id, user]) => {
      const nome = user.name || conn.getName(id) || 'Utente';  // Usa user.name, poi getName, altrimenti "Utente"
      return { id, text: `@${id.split('@')[0]}` };  // Aggiungi `@` davanti all'ID per mostrare il nome nel gruppo
    });

  const messaggio = utenti.length > 0 
    ? `⪨ 😴 𝕃𝕚𝕤𝕥𝕒 𝕕𝕖𝕚 𝕕𝕠𝕣𝕞𝕚𝕘𝕝𝕚𝕠𝕟𝕚 𝕚𝕟𝕒𝕥𝕥𝕚𝕧𝕚 😴 ⪩\n\n ${utenti.map(u => `► ${u.text}`).join('\n')}`  // Mostra i tag con `@`
    : `⪨ 😴 𝕃𝕚𝕤𝕥𝕒 𝕕𝕖𝕚 𝕕𝕠𝕣𝕞𝕚𝕘𝕝𝕚𝕠𝕟𝕚 𝕚𝕟𝕒𝕥𝕥𝕚𝕧𝕚 😴 ⪩\n\n> 𝑵𝒆𝒔𝒔𝒖𝒏 𝒖𝒕𝒆𝒏𝒕𝒆 𝒊𝒏 𝒍𝒊𝒔𝒕𝒂  ✘ `;

  // Aggiungi immagine in miniatura e scritta in miniatura
  const fixedImageUrl = "https://qu.ax/jRDci.png";  // URL fisso dell'immagine
  const profileBuffer = await (await fetch(fixedImageUrl)).buffer();  // Scarica e converte in buffer

  // Invia il messaggio con immagine e scritta in miniatura
  conn.sendMessage(m.chat, { 
    text: messaggio, 
    mentions: utenti.map(u => u.id)  // Usa direttamente gli ID per le mentions
  }, { 
    quoted: {
      key: {
        participants: "0@s.whatsapp.net",
        fromMe: false,
        id: "Halo",
      },
      message: {
        locationMessage: {
          name: "𝑪𝒂𝒕𝒆𝒈𝒐𝒓𝒊𝒂 𝒅𝒐𝒓𝒎𝒊𝒈𝒍𝒊𝒐𝒏𝒊 😴",  // Nome del messaggio in miniatura
          jpegThumbnail: profileBuffer,  // Immagine in miniatura
        },
      },
      participant: "0@s.whatsapp.net",
    },
  });
};

handler.command = /^(listadormiglioni)$/i;
export default handler;