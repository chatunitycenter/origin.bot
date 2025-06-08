import fetch from 'node-fetch';

const handler = async (m, { conn, participants }) => {
  const lowerText = m.text?.toLowerCase();

  // Attiva solo se contiene la parola chiave
  if (!lowerText || !lowerText.includes('sparisci')) return;

  if (!m.isGroup) return;

  const userToKick = m.mentionedJid[0] || m.quoted?.sender;

  if (!userToKick) {
    return m.reply('Tagga o rispondi a qualcuno con “sparisci” per rimuoverlo.');
  }

  if (!participants.some(p => p.id === userToKick)) {
    return m.reply('Questa persona non è nel gruppo.');
  }

  // Se hai risposto a un messaggio, lo elimina
  if (m.quoted) {
    await conn.sendMessage(m.chat, { delete: m.quoted.vM.key });
  }

  // Prova a caricare immagine
  let imageBuffer = await getBuffer('https://telegra.ph/file/99c27842d50f00c11320f.jpg');

  if (imageBuffer) {
    await conn.sendMessage(m.chat, {
      image: imageBuffer,
      caption: '*L\'utente è stato rimosso dal gruppo.*',
      mentions: [userToKick]
    }, { quoted: m });
  } else {
    await conn.sendMessage(m.chat, {
      text: '*L\'utente è stato rimosso dal gruppo.*',
      mentions: [userToKick]
    }, { quoted: m });
  }

  // Rimuove l'utente
  await conn.groupParticipantsUpdate(m.chat, [userToKick], 'remove');
};

handler.customPrefix = /sparisci/i;
handler.command = new RegExp(); // Per non usare prefissi
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;

// Funzione getBuffer sicura
async function getBuffer(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Errore nel fetch: ${res.status}`);
    return await res.buffer();
  } catch (e) {
    console.error('[getBuffer ERROR]:', e.message);
    return null;
  }
}
