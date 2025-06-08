import fs from 'fs';

async function handler(m, { isBotAdmin, isOwner, text, conn }) {
  if (!isBotAdmin) return m.reply('ⓘ Devo essere admin per poter funzionare.');
  if (!text) return m.reply('ⓘ Devi specificare un numero. Esempio: .add +393271710598');

  const rawNumber = text.replace(/[^\d]/g, '');
  if (rawNumber.length < 8) return m.reply('ⓘ Il numero inserito sembra non valido.');

  const normalized = '+' + rawNumber;
  const jid = normalized.replace('+', '') + '@s.whatsapp.net';
  const groupMetadata = conn.chats[m.chat]?.metadata;

  if (!groupMetadata) return m.reply('ⓘ Questo comando può essere usato solo nei gruppi.');

  const alreadyInGroup = groupMetadata.participants.some(p => p.id === jid);
  if (alreadyInGroup) return m.reply('ⓘ Questo numero è già nel gruppo.');

  try {
    console.log('Numero da aggiungere:', normalized);
    await conn.groupParticipantsUpdate(m.chat, [jid], 'add');

    const senderTag = `@${m.sender.split`@`[0]}`;
    const newUserTag = `@${normalized.replace('+', '')}`;
    
    conn.reply(m.chat, `✅ ${senderTag} ha aggiunto ${newUserTag} al gruppo!`, null, { 
      mentions: [m.sender, jid] 
    });

  } catch (error) {
    console.error("Errore durante l'aggiunta:", error);
    m.reply(
      '❌ Non sono riuscito ad aggiungere il numero. Assicurati che sia valido, che io sia admin e che il gruppo non abbia restrizioni.'
    );
  }
}

handler.command = ['add'];

export default handler;
