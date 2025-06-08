// Comando by Youns
import { WAMessageStubType } from '@whiskeysockets/baileys';

export async function before(m, { conn }) {
  const msgStubType = m.messageStubType;
  const chat = m.chat;
  const groupMetadata = await conn.groupMetadata(chat);
  const participants = groupMetadata.participants;
  const groupAdmins = participants.filter(p => p.admin).map(p => p.id);
  const ownerJid = groupMetadata.owner || (groupAdmins.length > 0 ? groupAdmins[0] : '');
  const botJid = conn.user.jid;
  const fkontak = {
    key: {
      participants: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "Halo"
    },
    message: {
      contactMessage: {
        displayName: "Sicurezza",
        vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;Security;;;\nFN:Security\nitem1.TEL;waid=0000000000:+0000000000\nitem1.X-ABLabel:Security\nEND:VCARD"
      }
    }
  };

  const activateSecurityMode = async (conn, chat, participants, ownerJid, botJid, quoted) => {
    for (const p of participants) {
      const isBotOrOwner = [botJid, ownerJid].includes(p.id);
      if (!isBotOrOwner && p.admin) {
        try {
          await conn.groupParticipantsUpdate(chat, [p.id], 'demote');
        } catch (e) {
          console.log('Errore nel demote:', e);
        }
      }
    }
    await conn.sendMessage(chat, { text: `✅ Modalità sicurezza attivata.\nTutti gli admin non autorizzati sono stati rimossi.`, mentions: participants.map(p => p.id) }, { quoted });
  };

  const sendMessageWithMention = async (conn, chat, text, mentions, quoted) => {
    await conn.sendMessage(chat, { text, mentions }, { quoted });
  };

  const AvvisaOwn = async (conn, ownerJid, groupName, userTag, motivo) => {
    await conn.sendMessage(ownerJid, {
      text: `⚠️ Sicurezza attivata nel gruppo *${groupName}*\n\nUtente: ${userTag}\nMotivo: ${motivo}`
    });
  };

  const senderJid = m.participant || m.key.participant || m.key.remoteJid;
  const senderTag = '@' + senderJid.split('@')[0];

  if (msgStubType === WAMessageStubType.GROUP_PARTICIPANT_PROMOTE) {
    const promoterJid = senderJid;
    const isPromoterOwner = promoterJid === ownerJid;
    const wasPromoterAdminBefore = groupAdmins.includes(promoterJid);
    const isPromoterAuthorized = isPromoterOwner || wasPromoterAdminBefore;

    if (!isPromoterAuthorized && promoterJid !== botJid) {
      await activateSecurityMode(conn, chat, participants, ownerJid, botJid, fkontak);
      await sendMessageWithMention(conn, chat, `⚠️ 𝐏𝐑𝐎𝐌𝐎𝐙𝐈𝐎𝐍𝐄 𝐒𝐎𝐒𝐏𝐄𝐓𝐓𝐀 ⚠️\n\n𝐋'𝐔𝐓𝐄𝐍𝐓𝐄 ${senderTag} 𝐇𝐀 𝐏𝐑𝐎𝐌𝐎𝐒𝐒𝐎 𝐔𝐍 𝐀𝐃𝐌𝐈𝐍 𝐒𝐄𝐍𝐙𝐀 𝐏𝐄𝐑𝐌𝐄𝐒𝐒𝐎`, [promoterJid], fkontak);
      await AvvisaOwn(conn, ownerJid, groupMetadata.subject, senderTag, `𝐏𝐑𝐎𝐌𝐎𝐙𝐈𝐎𝐍𝐄 𝐍𝐎𝐍 𝐀𝐔𝐓𝐎𝐑𝐈𝐙𝐙𝐀𝐓𝐀`);
    }
  } else if (msgStubType === WAMessageStubType.GROUP_PARTICIPANT_DEMOTE) {
    const demoterJid = senderJid;
    const isDemoterOwner = demoterJid === ownerJid;
    const wasDemoterAdminBefore = groupAdmins.includes(demoterJid);
    const isDemoterAuthorized = isDemoterOwner || wasDemoterAdminBefore;

    if (!isDemoterAuthorized && demoterJid !== botJid) {
      await activateSecurityMode(conn, chat, participants, ownerJid, botJid, fkontak);
      await sendMessageWithMention(conn, chat, `⚠️ 𝐃𝐄𝐌𝐎𝐓𝐄 𝐍𝐎𝐍 𝐏𝐄𝐑𝐌𝐄𝐒𝐒𝐎! ⚠️\n\n𝐋'𝐔𝐓𝐄𝐍𝐓𝐄 ${senderTag} 𝐇𝐀 𝐓𝐎𝐋𝐓𝐎 𝐔𝐍 𝐀𝐃𝐌𝐈𝐍 𝐒𝐄𝐍𝐙𝐀 𝐏𝐄𝐑𝐌𝐄𝐒𝐒𝐎`, [demoterJid], fkontak);
      await AvvisaOwn(conn, ownerJid, groupMetadata.subject, senderTag, `𝐃𝐄𝐌𝐎𝐓𝐄 𝐍𝐎𝐍 𝐀𝐔𝐓𝐎𝐑𝐈𝐙𝐙𝐀𝐓𝐎`);
    }
  }
}