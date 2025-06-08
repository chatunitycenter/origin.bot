let war = '3';

let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command }) => {
    let who;
    if (m.isGroup) {
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : true;
    } else {
        who = m.chat;
    }

    if (!who) return m.reply("⚠️ Specifica un utente da avvertire.");
    if (!(who in global.db.data.users)) return m.reply("𝐓𝐚𝐠 𝐦𝐚𝐧𝐜𝐚𝐧𝐭𝐞 ⁉️");

    let warn = global.db.data.users[who].warn;
    let user = global.db.data.users[who];

    // Link fisso per l'immagine da usare sempre
    const fixedImageUrl = "https://qu.ax/FADRN.png";

    const profileBuffer = await (await fetch(fixedImageUrl)).buffer();

    // Calcolo dei "warn" rimanenti
    let remainingWarn = war - warn;
    
    if (warn < war) {
        global.db.data.users[who].warn += 1;
        await conn.sendMessage(
            m.chat,
            {
                text: `                     ⚠️ ${user.warn} 𝐖𝐀𝐑𝐍 ⚠️\n\n➪ 𝑈𝑡𝑒𝑛𝑡𝑒: @${who.split('@')[0]}\n\n> *𝑨𝒏𝒄𝒐𝒓𝒂 ${remainingWarn} 𝒘𝒂𝒓𝒏 𝒆 𝒔𝒆𝒊 𝒇𝒖𝒐𝒓𝒊 𝒅𝒂𝒍 𝒈𝒓𝒖𝒑𝒑𝒐.*`, // Aggiunto il messaggio dei warn rimanenti
                mentions: [who],
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
                            name: "𝑨𝒗𝒗𝒆𝒓𝒕𝒊𝒎𝒆𝒏𝒕𝒐 ⚠️",
                            jpegThumbnail: profileBuffer,
                        },
                    },
                    participant: "0@s.whatsapp.net",
                },
            }
        );
    } else if (warn == war) {
        global.db.data.users[who].warn = 0;
        await conn.sendMessage(
            m.chat,
            {
                text: `⛔ 𝟒 𝐰𝐚𝐫𝐧 𝐫𝐚𝐠𝐠𝐢𝐮𝐧𝐭𝐢. 𝐋'𝐢𝐝𝐢𝐨𝐭𝐚 𝐞̀ 𝐟𝐮𝐨𝐫𝐢 𝐝𝐚 𝐪𝐮𝐢! ⛔`,
                mentions: [who],
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
                            name: "𝑹𝒊𝒎𝒐𝒛𝒊𝒐𝒏𝒆 ⛔",
                            jpegThumbnail: profileBuffer,
                        },
                    },
                    participant: "0@s.whatsapp.net",
                },
            }
        );
        await time(1000);
        await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
    }
};

handler.help = ['warn @user'];
handler.tags = ['group'];
handler.command = /^(warn)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;

// Funzione per la pausa temporale
const time = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};