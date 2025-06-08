// ANTINUKE BY ONIX, DI RIAD

let whitelist = [
  '639649477630@s.whatsapp.net', // Numero autorizzato
  '393516581971@s.whatsapp.net',
  '393281941895@s.whatsapp.net',
  '8562028556440@s.whatsapp.net',
  '393279399297@s.whatsapp.net',
  '393515533859@s.whatsapp.net',
  '393715983481@s.whatsapp.net',
  '447365589428@s.whatsapp.net',
  '393508287515@s.whatsapp.net',
  '393884769557@s.whatsapp.net',
  '447490570225@s.whatsapp.net',
  '393343343246@s.whatsapp.net',
  '4915755976313@s.whatsapp.net'
];

export async function before(m, { conn }) {
  if (![29, 30].includes(m.messageStubType)) return; //promozione e retrocessione

  const chatId = m.chat;
  const target = m.messageStubParameters?.[0]; // Chi è stato promosso/retrocesso
  const actor = m.participant || m.key.participant; // Chi ha fatto l'azione 

  if (!actor || !target || !chatId) return;

  const metadata = await conn.groupMetadata(chatId);
  const founder = metadata.owner;
  const botNumber = conn.user.jid;

  const autorizzati = [botNumber, founder, ...whitelist].filter(Boolean);

  if (autorizzati.includes(actor)) return;

  // admins?
  const currentAdmins = metadata.participants
    .filter(p => p.admin)
    .map(p => p.id);

  // rimuovo:
  const sospetti = new Set([
    ...currentAdmins.filter(id => !autorizzati.includes(id)),
    actor,
    target
  ]);

  const toDemote = [...sospetti].filter(id => !autorizzati.includes(id));

  if (toDemote.length > 0) {
    await conn.groupParticipantsUpdate(chatId, toDemote, 'demote');
    await conn.groupSettingUpdate(chatId, 'announcement');
    await conn.sendMessage(chatId, {
      text: `> 🚨 𝐑𝐈𝐋𝐄𝐕𝐀𝐓𝐎 𝐏𝐎𝐒𝐒𝐈𝐁𝐈𝐋𝐄 𝐒𝐕𝐓 🚨\n\n@${actor.split('@')[0]} 𝐡𝐚 𝐦𝐨𝐝𝐢𝐟𝐢𝐜𝐚𝐭𝐨 𝐢 𝐩𝐫𝐢𝐯𝐢𝐥𝐞𝐠𝐢 𝐝𝐢 @${target.split('@')[0]} \n\n🔒 𝐒𝐢𝐜𝐮𝐫𝐞𝐳𝐳𝐚 𝐚𝐭𝐭𝐢𝐯𝐚𝐭𝐚 🔒`,
      mentions: [actor, target]
    });
  }
}
