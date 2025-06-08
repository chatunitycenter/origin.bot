//𝐏𝐋𝐔𝐆𝐈𝐍 𝐁𝐘 𝐃𝐄𝐀𝐓𝐇 & 𝐘𝐎𝐔𝐍𝐒 - 𝐌𝐀𝐌𝐌𝐀 𝐒𝐈𝐀𝐌𝐎 𝐅𝐀𝐌𝐎𝐒𝐈!😁
import { WAMessageStubType } from '@whiskeysockets/baileys';

const PrefixNuke = ['*','_', '/', 'i', '!', '#', '$', '%', '+', '£', '¢', '€', '¥', '^', '°', '=', '¶', '∆', '×', '÷', 'π', '√', '✓', '©', '®', '&', '.', '\\', '-', '.', '@'];
const CmdNuke = ["nuke", "banghost", "svuota", "stermina", "takeover", "annienta", "ruba", "abusa", "cornuto"];
const LimiteRmv = 5;
const RmvTime = 60 * 1000;

const msgtoxic = [
    "negroide schifoso e inferiore da bruciare vivo",
    "gigante che non passa dalle porte",
];

const getTag = (jid) => `@${jid.split('@')[0]}`;

const sendMessageWithMention = async (conn, chatId, text, mentions = [], quoted) => {
    try {
        await conn.sendMessage(chatId, { text, mentions }, { quoted });
    } catch (error) {
        console.error("𝐄𝐑𝐑𝐎𝐑𝐄 𝐍𝐄𝐋 𝐈𝐍𝐕𝐈𝐀𝐑𝐄 𝐈𝐋 𝐌𝐄𝐒𝐒𝐀𝐆𝐈𝐎 𝐂𝐎𝐍 𝐓𝐀𝐆:", error);
    }
};

const AvvisaOwn = async (conn, ownerJid, groupSubject, actorTag, action, details = '', mentions = []) => {
    if (!ownerJid) return;
    try {
        let message = `⚠️🛡️ *𝐀𝐕𝐕𝐈𝐒𝐎 𝐃𝐈 𝐒𝐈𝐂𝐔𝐑𝐄𝐙𝐙𝐀* 🛡️⚠️\n\n*𝐆𝐑𝐔𝐏𝐏𝐎 𝐓𝐀𝐑𝐆𝐄𝐓:* ${groupSubject}\n*𝐔𝐒𝐄𝐑:* ${actorTag}\n*𝐀𝐙𝐈𝐎𝐍𝐄 𝐑𝐈𝐋𝐄𝐕𝐀𝐓𝐀:* ${action}`;
        if (details) message += `\n\n*𝐃𝐀𝐓𝐈:* ${details}`;
        message += `\n\n𝐒𝐈 𝐂𝐎𝐍𝐒𝐈𝐆𝐋𝐈𝐀 𝐃𝐈 𝐂𝐎𝐍𝐓𝐑𝐎𝐋𝐋𝐀𝐑𝐄 𝐈𝐋 𝐆𝐑𝐔𝐏𝐏𝐎`;
        await conn.sendMessage(ownerJid, { text: message, mentions });
    } catch (error) {
        console.error("𝐄𝐑𝐑𝐎𝐑𝐄 𝐍𝐄𝐋 𝐀𝐕𝐕𝐈𝐒𝐀 𝐋'𝐎𝐖𝐍𝐄𝐑:", error);
    }
};

const delay = time => new Promise(res => setTimeout(res, time));

const activateSecurityMode = async (conn, chatId, participants, ownerJid, botJid, fkontak) => {
    const admins = participants.filter(p => p.admin).map(p => p.id);
    const adminsToDemote = admins.filter(adminJid => adminJid !== ownerJid && adminJid !== botJid);

    if (adminsToDemote.length > 0) {
        await sendMessageWithMention(conn, chatId, `🚨 𝐒𝐈𝐂𝐔𝐑𝐄𝐙𝐙𝐀 𝐀𝐓𝐓𝐈𝐕𝐀𝐓𝐀! 🚨\n\n𝐫𝐢𝐥𝐞𝐯𝐚𝐭𝐨 𝐜𝐨𝐦𝐩𝐨𝐫𝐭𝐚𝐦𝐞𝐧𝐭𝐨 𝐬𝐨𝐬𝐩𝐞𝐭𝐭𝐨. 𝐓𝐮𝐭𝐭𝐢 𝐠𝐥𝐢 𝐚𝐝𝐦𝐢𝐧 (𝐞𝐜𝐜𝐞𝐭𝐭𝐨 𝐢𝐥 𝐜𝐫𝐞𝐚𝐭𝐨𝐫𝐞 𝐞 𝐢𝐥 𝐛𝐨𝐭) 𝐬𝐨𝐧𝐨 𝐬𝐭𝐚𝐭𝐢 𝐫𝐢𝐦𝐨𝐬𝐬𝐢 𝐝𝐚𝐥𝐥𝐚 𝐦𝐨𝐝𝐞𝐫𝐚𝐳𝐢𝐨𝐧𝐞.`, adminsToDemote.map(getTag), fkontak);
        await delay(500);

        try {
            await conn.groupParticipantsUpdate(chatId, adminsToDemote, 'demote');
        } catch (e) {
             console.error("𝐄𝐑𝐑𝐎𝐑:", e);
             for (const adminJid of adminsToDemote) {
                 try {
                      await conn.groupParticipantsUpdate(chatId, [adminJid], 'demote');
                      await delay(200);
                 } catch (e2) {
                      console.error(`𝐄𝐑𝐑𝐎𝐑:`, e2);
                      await sendMessageWithMention(conn, chatId, `⚠️ 𝐄𝐑𝐑𝐎𝐑𝐄 𝐍𝐄𝐋𝐋𝐀 𝐑𝐈𝐌𝐎𝐙𝐈𝐎𝐍𝐄 𝐃𝐈 ${getTag(adminJid)} 𝐃𝐀𝐆𝐋𝐈 𝐀𝐃𝐌𝐈𝐍 𝐃𝐔𝐑𝐀𝐍𝐓𝐄 𝐋𝐀 𝐌𝐎𝐃𝐀𝐋𝐈𝐓𝐀̀ 𝐒𝐈𝐂𝐔𝐑𝐄𝐙𝐙𝐀. 𝐑𝐈𝐂𝐇𝐈𝐄𝐒𝐓𝐎 𝐈𝐍𝐓𝐄𝐑𝐕𝐄𝐍𝐓𝐎 𝐌𝐀𝐍𝐔𝐀𝐋𝐄.`, [adminJid], fkontak);
                 }
             }
        }
    }
};

let handler = m => m;

handler.before = async function (m, { conn, participants, groupMetadata, isBotAdmin }) {
    if (!m.isGroup || !isBotAdmin) return;

    const chat = m.chat;
    const botJid = this.user.id || this.user.jid;
    const ownerJid = groupMetadata.owner;
    const groupAdmins = participants.filter(p => p.admin).map(p => p.id);
    const senderJid = m.sender;
    const senderTag = getTag(senderJid);

    const fkontak = {
        key: { participants: "0@s.whatsapp.net", remoteJid: "status@broadcast", fromMe: false, id: "DeathSecurityMode" },
        message: { contactMessage: { vcard: `BEGIN:VCARD\nVERSION:3.0\nN:𝐃𝐄𝐀𝐓𝐇-𝐁𝐎𝐓;\nFN:𝐃𝐄𝐀𝐓𝐇-𝐁𝐎𝐓\nitem1.TEL;waid=${senderJid.split('@')[0]}:${senderJid.split('@')[0]}\nitem1.X-ABLabel:𝐃𝐄𝐀𝐓𝐇-𝐁𝐎𝐓\nEND:VCARD` } },
        participant: "0@s.whatsapp.net"
    };

    const msgStubType = m.messageStubType;
    const msgStubParams = m.messageStubParameters || [];

    if (msgStubType === WAMessageStubType.GROUP_PARTICIPANT_PROMOTE) {
        const targetJid = msgStubParams[0];
        const targetTag = getTag(targetJid);
        await sendMessageWithMention(conn, chat, `${targetTag} 𝐄̀ 𝐒𝐓𝐀𝐓𝐎 𝐌𝐄𝐒𝐒𝐎/𝐀 𝐀𝐃𝐌𝐈𝐍 𝐃𝐀 ${senderTag}`, [senderJid, targetJid, ...groupAdmins.filter(admin => admin !== targetJid && admin !== senderJid)], fkontak);
    } else if (msgStubType === WAMessageStubType.GROUP_PARTICIPANT_DEMOTE) {
        const targetJid = msgStubParams[0];
        const targetTag = getTag(targetJid);
        await sendMessageWithMention(conn, chat, `${targetTag} 𝐄̀ 𝐒𝐓𝐀𝐓𝐎 𝐓𝐎𝐋𝐓𝐎/𝐀 𝐀𝐃𝐌𝐈𝐍 𝐃𝐀 ${senderTag}`, [senderJid, targetJid, ...groupAdmins.filter(admin => admin !== targetJid && admin !== senderJid)], fkontak);
    }

    if (msgStubType === WAMessageStubType.GROUP_PARTICIPANT_PROMOTE) {
        const promoterJid = senderJid;
        const promotedJids = msgStubParams;

        const adminsBeforeEvent = groupAdmins.filter(admin => !promotedJids.includes(admin));
        const isPromoterOwner = promoterJid === ownerJid;
        const wasPromoterAdminBefore = adminsBeforeEvent.includes(promoterJid);
        const isPromoterAuthorized = isPromoterOwner || wasPromoterAdminBefore;

        if (!isPromoterAuthorized && promoterJid !== botJid) {
             await activateSecurityMode(conn, chat, participants, ownerJid, botJid, fkontak);
            await sendMessageWithMention(conn, chat, `⚠️ 𝐀𝐃𝐌𝐈𝐍 𝐍𝐎𝐍 𝐏𝐄𝐑𝐌𝐄𝐒𝐒𝐎! ⚠️\n\n𝐋'𝐔𝐓𝐄𝐍𝐓𝐄 ${senderTag} 𝐇𝐀 𝐓𝐄𝐍𝐓𝐀𝐓𝐎 𝐃𝐈 𝐌𝐄𝐓𝐓𝐄𝐑𝐄 𝐀𝐃𝐌𝐈𝐍 𝐒𝐄𝐍𝐙𝐀 𝐏𝐄𝐑𝐌𝐄𝐒𝐒𝐎`, [promoterJid], fkontak);
            await delay(100);

            const demotedUsersTags = [];
            for (const promotedJid of promotedJids) {
                if (promotedJid !== ownerJid && promotedJid !== botJid) {
                    try {
                        await conn.groupParticipantsUpdate(chat, [promotedJid], 'demote');
                        const promotedTag = getTag(promotedJid);
                        demotedUsersTags.push(promotedTag);
                        await sendMessageWithMention(conn, chat, `❌ ${promotedTag} 𝐄̀ 𝐒𝐓𝐀𝐓𝐎 𝐓𝐎𝐋𝐓𝐎/𝐀 𝐀𝐃𝐌𝐈𝐍 𝐏𝐄𝐑𝐂𝐇𝐄 𝐋𝐀 𝐏𝐑𝐎𝐌𝐎𝐙𝐈𝐎𝐍𝐄 𝐃𝐀 𝐏𝐀𝐑𝐓𝐄 𝐃𝐈 ${senderTag} 𝐍𝐎𝐍 𝐄𝐑𝐀 𝐀𝐔𝐓𝐎𝐑𝐈𝐙𝐙𝐀𝐓𝐀`, [promotedJid, promoterJid], fkontak);
                        await delay(500);
                    } catch (e) {
                        await sendMessageWithMention(conn, chat, `⚠️ 𝐄𝐑𝐑𝐎𝐑𝐄 𝐍𝐄𝐋𝐋𝐀 𝐑𝐈𝐌𝐎𝐙𝐈𝐎𝐍𝐄 𝐃𝐈 ${getTag(promotedJid)} 𝐃𝐀𝐆𝐋𝐈 𝐀𝐃𝐌𝐈𝐍. 𝐄 𝐑𝐈𝐂𝐇𝐈𝐄𝐒𝐓𝐎 𝐋'𝐈𝐍𝐓𝐄𝐑𝐕𝐄𝐍𝐓𝐎 𝐌𝐀𝐍𝐔𝐀𝐋𝐄 𝐃𝐀 𝐏𝐀𝐑𝐓𝐄 𝐃𝐄𝐋𝐋'𝐎𝐖𝐍𝐄𝐑 𝐈𝐋 𝐏𝐑𝐈𝐌𝐀 𝐏𝐎𝐒𝐒𝐈𝐁𝐈𝐋𝐄`, [promotedJid], fkontak);
                    }
                }
            }

            try {
                 const currentParticipants = await conn.groupMetadata(chat).then(md => md.participants);
                 const isPromoterStillAdminNow = currentParticipants.find(p => p.id === promoterJid)?.admin;

                 if (isPromoterStillAdminNow && promoterJid !== ownerJid) {
                    await conn.groupParticipantsUpdate(chat, [promoterJid], 'demote');
                    await sendMessageWithMention(conn, chat, `❌ ${senderTag} 𝐄̀ 𝐒𝐓𝐀𝐓𝐎 𝐓𝐎𝐋𝐓𝐎/𝐀 𝐀𝐃𝐌𝐈𝐍 𝐏𝐄𝐑 𝐀𝐕𝐄𝐑 𝐌𝐄𝐒𝐒𝐎 𝐀𝐃𝐌𝐈𝐍 𝐍𝐎𝐍 𝐀𝐔𝐓𝐎𝐑𝐈𝐙𝐙𝐀𝐓𝐈.`, [promoterJid], fkontak);
                    await delay(500);
                    await AvvisaOwn(conn, ownerJid, groupMetadata.subject, senderTag, `𝐓𝐄𝐍𝐓𝐀𝐓𝐈𝐕𝐎 𝐃𝐈 𝐏𝐑𝐎𝐌𝐎𝐙𝐈𝐎𝐍𝐈 𝐍𝐎𝐍 𝐀𝐔𝐓𝐎𝐑𝐈𝐙𝐙𝐀𝐓𝐄\n𝐔𝐓𝐄𝐍𝐓𝐈 𝐏𝐑𝐎𝐌𝐎𝐒𝐒𝐈 (𝐎𝐑𝐚 𝐍𝐎𝐍 𝐏𝐈𝐔 𝐀𝐃𝐌𝐈𝐍): ${demotedUsersTags.join(', ') || '𝐍𝐄𝐒𝐒𝐔𝐍𝐎 (𝐏𝐎𝐒𝐒𝐈𝐁𝐈𝐋𝐄 𝐄𝐑𝐑𝐎𝐑𝐄 𝐃𝐄𝐋 𝐁𝐎𝐓 𝐎 𝐅𝐎𝐑𝐒𝐄 𝐄𝐑𝐀 𝐆𝐈𝐀 𝐀𝐃𝐌𝐈𝐍)'}.\n𝐋'𝐔𝐓𝐄𝐍𝐓𝐄 ${senderTag} 𝐎𝐑𝐀 𝐍𝐎𝐍 𝐄̀ 𝐏𝐈𝐔 𝐀𝐃𝐌𝐈𝐍.`, [promoterJid, ...promotedJids]);
                 } else if (promoterJid !== ownerJid) {
                      await AvvisaOwn(conn, ownerJid, groupMetadata.subject, senderTag, `𝐏𝐑𝐎𝐌𝐎𝐙𝐈𝐎𝐍𝐄 𝐍𝐎𝐍 𝐀𝐔𝐓𝐎𝐑𝐈𝐙𝐙𝐀𝐓𝐀\n𝐔𝐓𝐄𝐍𝐓𝐈 𝐏𝐑𝐏𝐌𝐎𝐒𝐒𝐈 (𝐍𝐎𝐍 𝐏𝐈𝐔 𝐀𝐃𝐌𝐈𝐍): ${demotedUsersTags.join(', ') || '𝐍𝐄𝐒𝐒𝐔𝐍𝐎'}.\n𝐋'𝐀𝐃𝐌𝐈𝐍 ${senderTag} 𝐄̀ 𝐒𝐓𝐀𝐓𝐎 𝐑𝐈𝐌𝐎𝐒𝐒𝐎 𝐃𝐀𝐆𝐋𝐈 𝐀𝐃𝐌𝐈𝐍 𝐂𝐎𝐍 𝐒𝐔𝐂𝐄𝐒𝐒𝐎`, [promoterJid, ...promotedJids]);
                 } else {
                      await AvvisaOwn(conn, ownerJid, groupMetadata.subject, senderTag, `𝐏𝐑𝐎𝐌𝐎𝐙𝐈𝐎𝐍𝐄 𝐄𝐅𝐅𝐄𝐓𝐓𝐔𝐀𝐓𝐀 (𝐃𝐀 𝐎𝐖𝐍𝐄𝐑)\n𝐔𝐓𝐄𝐍𝐓𝐈 𝐏𝐑𝐎𝐌𝐎𝐒𝐒𝐈: ${promotedJids.map(getTag).join(', ')}. 𝐀𝐙𝐈𝐎𝐍𝐄 𝐀𝐔𝐓𝐎𝐑𝐈𝐙𝐙𝐀𝐓𝐀.`, [promoterJid, ...promotedJids]);
                 }
            } catch (e) {
                await sendMessageWithMention(conn, chat, `⚠️ 𝐄𝐑𝐑𝐎𝐑𝐄 𝐍𝐄𝐋𝐋𝐀 𝐑𝐈𝐌𝐎𝐙𝐈𝐎𝐍𝐄 𝐃𝐈 ${senderTag} 𝐃𝐀𝐆𝐋𝐈 𝐀𝐃𝐌𝐈𝐍. 𝐄 𝐑𝐈𝐂𝐇𝐈𝐄𝐒𝐓𝐎 𝐋'𝐈𝐍𝐓𝐄𝐑𝐕𝐄𝐍𝐓𝐎 𝐌𝐀𝐍𝐔𝐀𝐋𝐄 𝐈𝐋 𝐏𝐑𝐈𝐌𝐀 𝐏𝐎𝐒𝐒𝐈𝐁𝐈𝐋𝐄.`, [promoterJid], fkontak);
                await AvvisaOwn(conn, ownerJid, groupMetadata.subject, senderTag, `𝐄𝐑𝐑𝐎𝐑𝐄 𝐍𝐄𝐋 𝐀𝐍𝐓𝐈-𝐑𝐔𝐁𝐀\n𝐍𝐎𝐍 𝐄 𝐒𝐓𝐀𝐓𝐎 𝐏𝐎𝐒𝐒𝐈𝐁𝐈𝐋𝐄 𝐑𝐈𝐌𝐔𝐎𝐕𝐄𝐑𝐄 ${senderTag} 𝐃𝐀𝐆𝐋𝐈 𝐀𝐃𝐌𝐈𝐍, 𝐄𝐑𝐑𝐎𝐑𝐄: ${e}`, [promoterJid]);
            }
            return;
        }
    }

    if (m.text) {
        const text = m.text;
        const lowerCaseText = text.toLowerCase();

        for (const phrase of msgtoxic) {
            if (lowerCaseText.includes(phrase)) {
                const users = global.db.data.users;
                if (!users[senderJid]) {
                    users[senderJid] = {};
                }
                users[senderJid].muto = true;
                await sendMessageWithMention(conn, chat, `${senderTag} 𝐄̀ 𝐔𝐍 𝐓𝐎𝐗𝐈𝐂 𝐃𝐄𝐋 𝐂𝐀𝐙𝐙𝐎 𝐄̀ 𝐎𝐑𝐀 𝐍𝐎𝐍 𝐏𝐎𝐓𝐑𝐀 𝐏𝐈𝐔 𝐏𝐀𝐑𝐋𝐀𝐑𝐄 𝐏𝐄𝐑 5 𝐌𝐈𝐍𝐔𝐓𝐈`, [senderJid], fkontak);

                setTimeout(async () => {
                    if (users[senderJid]) {
                        users[senderJid].muto = false;
                        await sendMessageWithMention(conn, chat, `${senderTag} 𝐍𝐎𝐍 𝐄̀ 𝐏𝐈𝐔 𝐌𝐔𝐓𝐀𝐓𝐎`, [senderJid], fkontak);
                    }
                }, 5 * 60 * 1000);
                return;
            }
        }

        const matchedPrefix = PrefixNuke.find(prefix => text.startsWith(prefix));

        if (matchedPrefix) {
            const commandText = text.slice(matchedPrefix.length).trim().toLowerCase();
            const isNukeCommand = CmdNuke.some(keyword => commandText.startsWith(keyword.toLowerCase()));

            if (isNukeCommand) {
                const isAdminSender = groupAdmins.includes(senderJid);
                if (isAdminSender) {
                     await activateSecurityMode(conn, chat, participants, ownerJid, botJid, fkontak);
                    try {
                        await sendMessageWithMention(conn, chat, `⚠️ 𝐏𝐎𝐒𝐒𝐈𝐁𝐈𝐋𝐄 𝐒𝐕𝐓! ⚠️\n\n𝐋'𝐀𝐃𝐌𝐈𝐍 ${senderTag} 𝐇𝐀 𝐔𝐒𝐀𝐓𝐎 𝐔𝐍 𝐂𝐎𝐌𝐀𝐍𝐃𝐎 𝐒𝐎𝐒𝐏𝐄𝐓𝐓𝐎: ${text}\n\n𝐏𝐄𝐑 𝐒𝐈𝐂𝐔𝐑𝐄𝐙𝐙𝐀 𝐕𝐄𝐑𝐑𝐀 𝐑𝐈𝐌𝐎𝐒𝐒𝐎 𝐃𝐀𝐋 𝐆𝐑𝐔𝐏𝐏𝐎`, [senderJid], fkontak);
                        await delay(100);
                        await conn.groupParticipantsUpdate(chat, [senderJid], 'remove');
                        await AvvisaOwn(conn, ownerJid, groupMetadata.subject, senderTag, `𝐂𝐎𝐌𝐀𝐍𝐃𝐎 𝐒𝐎𝐒𝐏𝐄𝐓𝐓𝐎 𝐔𝐒𝐀𝐓𝐎\n𝐂𝐎𝐌𝐀𝐍𝐃𝐎: "${text}". 𝐋'𝐀𝐃𝐌𝐈𝐍 𝐄̀ 𝐒𝐓𝐀𝐓𝐎 𝐑𝐈𝐌𝐎𝐒𝐒𝐎 𝐃𝐀𝐋 𝐆𝐑𝐔𝐏𝐏𝐎`, [senderJid]);
                        return;
                    } catch (error) {
                        await sendMessageWithMention(conn, chat, `⚠️ 𝐄𝐑𝐑𝐎𝐑𝐄 𝐍𝐄𝐋𝐋𝐀 𝐑𝐈𝐌𝐎𝐙𝐈𝐎𝐍𝐄 𝐃𝐈 ${senderTag} 𝐏𝐄𝐑 𝐔𝐒𝐎 𝐃𝐈 𝐂𝐎𝐌𝐀𝐍𝐃𝐈 𝐒𝐎𝐒𝐏𝐄𝐓𝐓𝐈.`, [senderJid], fkontak);
                        await AvvisaOwn(conn, ownerJid, groupMetadata.subject, senderTag, `𝐄𝐑𝐑𝐎𝐑𝐄 𝐍𝐄𝐋 𝐀𝐍𝐓𝐈-𝐍𝐔𝐊𝐄\n𝐂𝐎𝐌𝐀𝐍𝐃𝐎 𝐒𝐎𝐒𝐏𝐄𝐓𝐓𝐎: "${text}". 𝐈𝐌𝐏𝐎𝐒𝐒𝐈𝐁𝐈𝐋𝐄 𝐑𝐈𝐌𝐔𝐎𝐕𝐄𝐑𝐄 𝐋'𝐀𝐃𝐌𝐈𝐍 𝐃𝐀𝐋 𝐆𝐑𝐔𝐏𝐏𝐎. 𝐄𝐑𝐑: ${error}`, [senderJid]);
                    }
                }
            }
        }
    }

    if (msgStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
        const removerJid = senderJid;

        if (removerJid === botJid || removerJid === ownerJid || !groupAdmins.includes(removerJid)) {
            return;
        }

        const now = Date.now();
        if (!this.userRemovalControl) this.userRemovalControl = {};
        if (!this.userRemovalControl[removerJid]) {
            this.userRemovalControl[removerJid] = { count: 0, lastRemovalTime: 0 };
        }

        const removerState = this.userRemovalControl[removerJid];
        const timeSinceLastRemoval = now - removerState.lastRemovalTime;

        if (timeSinceLastRemoval < RmvTime) {
            removerState.count++;
        } else {
            removerState.count = 1;
        }
        removerState.lastRemovalTime = now;

        if (removerState.count >= LimiteRmv) {
             await activateSecurityMode(conn, chat, participants, ownerJid, botJid, fkontak);
            const removerTag = getTag(removerJid);
            try {
                await sendMessageWithMention(conn, chat, `⚠️ 𝐒𝐕𝐓 𝐑𝐈𝐋𝐄𝐕𝐀𝐓𝐎! ⚠️\n\n𝐋'𝐀𝐃𝐌𝐈𝐍 ${removerTag} 𝐇𝐀 𝐑𝐈𝐌𝐎𝐒𝐒𝐎 ${removerState.count} 𝐌𝐄𝐌𝐍𝐑𝐈 𝐈𝐍 𝐏𝐎𝐂𝐎 𝐓𝐄𝐌𝐏𝐎\n\n𝐎𝐑𝐀 𝐍𝐎𝐍 𝐀𝐕𝐑𝐀 𝐏𝐈𝐔 𝐏𝐑𝐈𝐕𝐈𝐋𝐄𝐆𝐈 𝐃𝐀 𝐀𝐃𝐌𝐈𝐍`, [removerJid], fkontak);
                await delay(100);
                await conn.groupParticipantsUpdate(chat, [removerJid], 'demote');
                await AvvisaOwn(conn, ownerJid, groupMetadata.subject, removerTag, `𝐑𝐈𝐋𝐄𝐕𝐀𝐓𝐎 𝐓𝐄𝐍𝐓𝐀𝐓𝐈𝐕𝐎 𝐃𝐈 𝐒𝐕𝐓\n𝐔𝐓𝐄𝐍𝐓𝐈 𝐑𝐈𝐌𝐎𝐒𝐒𝐈: ${removerState.count} 𝐈𝐍 𝐌𝐄𝐍𝐎 𝐃𝐈 ${RmvTime / 1000} 𝐒𝐄𝐂. 𝐋'𝐔𝐓𝐄𝐍𝐓𝐄 𝐍𝐎𝐍 𝐄 𝐏𝐈𝐔 𝐔𝐍 𝐀𝐃𝐌𝐈𝐍`, [removerJid]);
                delete this.userRemovalControl[removerJid];
                return;
            } catch (error) {
                await sendMessageWithMention(conn, chat, `⚠️ 𝐄𝐑𝐑𝐎𝐑𝐄 𝐃𝐄𝐋𝐋𝐀 𝐑𝐈𝐌𝐎𝐙𝐈𝐎𝐍𝐄 𝐃𝐈 ${removerTag}`, [removerJid], fkontak);
                await AvvisaOwn(conn, ownerJid, groupMetadata.subject, removerTag, `𝐄𝐑𝐑𝐎𝐑𝐄 𝐃𝐔𝐑𝐀𝐍𝐓𝐄 𝐋'𝐀𝐓𝐓𝐈𝐕𝐀𝐙𝐈𝐎𝐍𝐄 𝐃𝐄𝐋 𝐀𝐍𝐓𝐈-𝐍𝐔𝐊𝐄\n𝐈𝐋 𝐓𝐄𝐍𝐓𝐀𝐓𝐈𝐕𝐎 𝐃𝐈 𝐑𝐈𝐌𝐔𝐎𝐕𝐄𝐑𝐄 ${removerTag} 𝐃𝐀𝐆𝐋𝐈 𝐀𝐃𝐌𝐈𝐍 𝐄 𝐅𝐀𝐋𝐋𝐈𝐓𝐎. 𝐄𝐑𝐑𝐎𝐑: ${error}`, [removerJid]);
                delete this.userRemovalControl[removerJid];
            }
        }
    }
};

export default handler;