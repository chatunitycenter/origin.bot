let handler = async (m, { conn, args, groupMetadata }) => {
    let who;
    if (m.isGroup) {
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    } else {
        who = m.chat;
    }

    if (!who) return;
    if (!(who in global.db.data.users)) return;

    let warn = global.db.data.users[who].warn;

    // Link fisso per l'immagine da usare sempre
    const fixedImageUrl = "https://qu.ax/wxUZP.png";
    const profileBuffer = await (await fetch(fixedImageUrl)).buffer();

    if (warn > 0) {
        global.db.data.users[who].warn -= 1;

        // Calcolare il numero di warn rimanenti
        const remainingWarns = warn - 1;

        // Gestire il plurale o singolare per "warn rimanenti"
        const warnText = remainingWarns === 1 ? '𝒘𝒂𝒓𝒏 𝒓𝒊𝒎𝒂𝒏𝒆𝒏𝒕𝒆.' : '𝒘𝒂𝒓𝒏 𝒓𝒊𝒎𝒂𝒏𝒆𝒏𝒕𝒊.';

        // Messaggio con il tag dell'utente come seconda riga e i warn rimanenti come terza riga
        const messageText = `             𝐕𝐞𝐝𝐢 𝐝𝐢 𝐟𝐚𝐫𝐞 𝐢𝐥 𝐛𝐫𝐚𝐯𝐨 𝐨𝐫𝐚 🙄\n\n➪ 𝑈𝑡𝑒𝑛𝑡𝑒: @${who.split('@')[0]}\n\n> ${remainingWarns} ${warnText}`;

        await conn.sendMessage(
            m.chat,
            {
                text: messageText,
                mentions: [who], // Tagga l'utente correttamente
            },
            {
                quoted: {
                    key: {
                        participants: "0@s.whatsapp.net",
                        fromMe: false,
                        id: "Halo",
                    },
                    message: {
                        locationMessage: {
                            'name': "𝑹𝒊𝒎𝒐𝒛𝒊𝒐𝒏𝒆 𝒘𝒂𝒓𝒏 ✔︎",
                            'jpegThumbnail': profileBuffer, // Miniatura dell'immagine
                        },
                    },
                    participant: "0@s.whatsapp.net",
                },
            }
        );
    } else if (warn == 0) {
        return; // Non invia alcun messaggio se non ci sono avvertimenti
    }
};

handler.help = ['delwarn @user'];
handler.tags = ['group'];
handler.command = ['unwarn'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;