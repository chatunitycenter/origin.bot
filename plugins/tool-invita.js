import fs from 'fs';

async function handler(m, { isBotAdmin, isOwner, text, conn }) {
  if (!isBotAdmin) return m.reply('ⓘ Devo essere admin per poter funzionare.');

  if (!text) return m.reply('ⓘ Devi specificare un numero. Esempio: .invita +1 555 123-4567');

  const cleanedNumber = text.replace(/\D/g, '');
  if (!cleanedNumber) return m.reply('ⓘ Numero non valido.');

  const jid = cleanedNumber + '@s.whatsapp.net';

  const groupMetadata = conn.chats[m.chat]?.metadata;
  if (!groupMetadata) return m.reply('ⓘ Questo comando può essere usato solo nei gruppi.');

  try {
    const inviteCode = await conn.groupInviteCode(m.chat);
    const inviteLink = `https://chat.whatsapp.com/${inviteCode}`;

    await conn.sendMessage(jid, {
      text: `Ciao, qualcuno ti ha invitato a questo gruppo *${groupMetadata.subject}*!\nEcco il link per entrare:\n${inviteLink}`
    });

    m.reply(`✅ Invito inviato al numero +${cleanedNumber}`);

  } catch (error) {
    console.error("Errore durante l'invio dell'invito:", error);
    m.reply(
      '❌ Non sono riuscito a inviare il link. Assicurati che il numero sia corretto, che io sia admin e che il gruppo non abbia restrizioni.'
    );
  }
}

handler.command = ['invita'];

export default handler;
