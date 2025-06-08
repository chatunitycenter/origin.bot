import fs from 'fs';

const owners = [
  '393715983481@s.whatsapp.net',
  '393884769557@s.whatsapp.net'
];
const adminsPath = './config/admins.json';

let modalitaSicurezzaAttiva = {};

async function attivaSicurezza(conn, chat, promotore, promosso) {
  const metadata = await conn.groupMetadata(chat);
  const participants = metadata.participants;

  const adminList = participants
    .filter(p => p.admin && !owners.includes(p.id) && p.id !== conn.user.id)
    .map(p => p.id);

  const promotoreTag = '@' + promotore.split('@')[0];
  const promossoTag = '@' + promosso.split('@')[0];
  const ownersTag = owners.map(o => '@' + o.split('@')[0]).join(' ');

  const messaggioAllarme = `🚨 *𝐀𝐋𝐋𝐀𝐑𝐌𝐄 𝐒𝐈𝐂𝐔𝐑𝐄𝐙𝐙𝐀 𝐀𝐓𝐓𝐈𝐕𝐀𝐓𝐎* 🚨

⚠️ *𝐀𝐃𝐌𝐈𝐍 𝐈𝐍𝐅𝐄𝐃𝐄𝐋𝐄:* ${promotoreTag}
👤 *𝐔𝐓𝐄𝐍𝐓𝐄 𝐏𝐑𝐎𝐌𝐎𝐒𝐒𝐎:* ${promossoTag}

𝐌𝐎𝐓𝐈𝐕𝐎: 𝐑𝐈𝐋𝐄𝐕𝐀𝐓𝐀 𝐏𝐑𝐎𝐌𝐎𝐙𝐈𝐎𝐍𝐄 𝐍𝐎𝐍 𝐀𝐔𝐓𝐎𝐑𝐎𝐙𝐙𝐀𝐓𝐀 𝐃𝐀 𝐔𝐍 𝐀𝐃𝐌𝐈𝐍 (${promotore})

🛡️ *𝐀𝐓𝐓𝐈𝐕𝐎 𝐌𝐎𝐃𝐀𝐋𝐈𝐓𝐀 𝐒𝐈𝐂𝐔𝐑𝐀...* 🛡️

👑 *𝐑𝐈𝐂𝐇𝐈𝐄𝐃𝐎 𝐀𝐓𝐓𝐄𝐍𝐙𝐈𝐎𝐍𝐄 𝐃𝐄𝐋𝐋\'𝐎𝐖𝐍𝐄𝐑:*
${ownersTag}`;

  await conn.sendMessage(chat, {
    text: messaggioAllarme,
    mentions: [promotore, promosso, ...owners]
  });

  for (const admin of adminList) {
    await conn.groupParticipantsUpdate(chat, [admin], 'demote');
  }

  fs.writeFileSync(adminsPath, JSON.stringify(adminList, null, 2));
  await conn.groupSettingUpdate(chat, 'announcement');

  const messaggioAttivata = `🛡️ *𝐌𝐎𝐃𝐀𝐋𝐈𝐓𝐀 𝐒𝐈𝐂𝐔𝐑𝐄𝐙𝐙𝐀 𝐀𝐓𝐓𝐈𝐕𝐀* 🛡️

✅ 𝐑𝐈𝐌𝐎𝐒𝐒𝐈 ${adminList.length} 𝐀𝐃𝐌𝐈𝐍.
✅ 𝐆𝐑𝐔𝐏𝐏𝐎 𝐂𝐇𝐈𝐔𝐒𝐎 𝐏𝐄𝐑 𝐌𝐎𝐓𝐈𝐕𝐈 𝐃𝐈 𝐒𝐈𝐂𝐔𝐑𝐄𝐙𝐙𝐀

👑 𝐎𝐄𝐀 𝐒𝐎𝐋𝐎 𝐆𝐋𝐈 𝐎𝐖𝐍𝐄𝐑 𝐃𝐄𝐋 𝐁𝐎𝐓 & 𝐈𝐋 𝐁𝐎𝐓 𝐒𝐎𝐍𝐎 𝐀𝐌𝐌𝐄𝐒𝐒𝐈 𝐂𝐎𝐌𝐄 𝐀𝐌𝐌𝐈𝐍𝐈𝐒𝐓𝐑𝐀𝐓𝐎𝐑𝐈

⚠️ 𝐐𝐔𝐀𝐋𝐒𝐈𝐀𝐒𝐈 𝐂𝐎𝐌𝐀𝐍𝐃𝐎 𝐃𝐄𝐋 𝐁𝐎𝐓 𝐒𝐀𝐑𝐀 𝐃𝐈𝐒𝐏𝐎𝐍𝐈𝐁𝐈𝐋𝐄 𝐒𝐎𝐋𝐎 𝐏𝐄𝐑 𝐆𝐋𝐈 𝐎𝐖𝐍𝐄𝐑
𝐎𝐑𝐀 𝐒𝐎𝐋𝐎 𝐔𝐍 𝐎𝐖𝐍𝐄𝐑 𝐏𝐎𝐓𝐑𝐀 𝐋𝐄𝐕𝐀𝐑𝐄 𝐋𝐀 𝐌𝐎𝐃𝐀𝐋𝐈𝐓𝐀 𝐒𝐈𝐂𝐔𝐑𝐄𝐙𝐙𝐀 𝐃𝐈𝐆𝐈𝐓𝐀𝐍𝐃𝐎 !safe

👑 *𝐎𝐖𝐍𝐄𝐑 𝐃𝐄𝐋 𝐁𝐎𝐓:* ${ownersTag}`;

  await conn.sendMessage(chat, {
    text: messaggioAttivata,
    mentions: owners
  });

  modalitaSicurezzaAttiva[chat] = true;
}

async function disattivaSicurezza(conn, chat, m) {
  if (!modalitaSicurezzaAttiva[chat]) return m.reply('❌ 𝐋𝐀 𝐌𝐎𝐃𝐀𝐋𝐈𝐓𝐀 𝐒𝐈𝐂𝐔𝐑𝐄𝐙𝐙𝐀 𝐄 𝐆𝐈𝐀 𝐎𝐅𝐅.');

  const adminList = JSON.parse(fs.readFileSync(adminsPath));

  for (const admin of adminList) {
    await conn.groupParticipantsUpdate(chat, [admin], 'promote');
  }

  await conn.groupSettingUpdate(chat, 'not_announcement');

  await conn.sendMessage(chat, {
    text: `🛡️ *𝐒𝐏𝐄𝐆𝐍𝐈𝐌𝐄𝐍𝐓𝐎 𝐌𝐎𝐃𝐀𝐋𝐈𝐓𝐀 𝐒𝐈𝐂𝐔𝐑𝐄𝐙𝐙𝐀...* 🛡️`
  });

  await conn.sendMessage(chat, {
    text: `✅ *𝐌𝐎𝐃𝐀𝐋𝐈𝐓𝐀 𝐒𝐈𝐂𝐔𝐑𝐄𝐙𝐙𝐀 𝐎𝐅𝐅* ✅

𝐑𝐈𝐏𝐑𝐈𝐒𝐓𝐈𝐍𝐀𝐓𝐈 ${adminList.length} 𝐀𝐃𝐌𝐈𝐍.`
  });

  modalitaSicurezzaAttiva[chat] = false;
}

let handler = async (m, { conn }) => {
  const chat = m.chat;

  if (m.body && m.body.trim() === '!safe' && owners.includes(m.sender)) {
    return await disattivaSicurezza(conn, chat, m);
  }

  if (m.messageStubType === 29 && m.messageStubParameters?.length >= 2) {
    const promosso = m.messageStubParameters[0];
    const promotore = m.messageStubParameters[1];

    if (!owners.includes(promotore)) {
      await attivaSicurezza(conn, chat, promotore, promosso);
    }
  }
};

handler.group = true;
handler.listen = true;

export default handler;