let handler = async (m, { conn, isAdmin }) => {
    let groupMetadata = await conn.groupMetadata(m.chat);
    let groupMembers = groupMetadata.participants.map(participant => participant.id);

    let adv = Object.entries(global.db.data.users)
        .filter(([jid, user]) => user.warn && groupMembers.includes(jid));

    let caption = `⚠️     *𝖀𝖙𝖊𝖓𝖙𝖎 𝖈𝖔𝖓 𝖎 𝖜𝖆𝖗𝖓*     ⚠️\n> ➥ 𝑻𝑶𝑻𝑨𝑳𝑬 𝑼𝑻𝑬𝑵𝑻𝑰 : ${adv.length}  ${adv.length ? '\n' + adv.map(([jid, user], i) => `

 \n*${i + 1}.* ${conn.getName(jid) == undefined ? 'Senza utenti' : conn.getName(jid) + `    ➟ 𝐭𝐨𝐭 𝐰𝐚𝐫𝐧: ${user.warn}/4`}
 ${isAdmin ? '@' + jid.split`@`[0] : jid}\n━━━━━━`.trim()).join('\n') : ''}
`;

    // Link dell'immagine da usare come miniatura
    const fixedImageUrl = "https://qu.ax/vJRAJ.png"; // Immagine fissa
    const profileBuffer = await (await fetch(fixedImageUrl)).buffer();

    // Invia il messaggio con l'immagine in miniatura
    await conn.sendMessage(m.chat, {
        text: caption, // Testo del messaggio
        mentions: conn.parseMention(caption), // Le mention degli utenti
    }, {
        quoted: {
            key: {
                participants: "0@s.whatsapp.net",
                fromMe: false,
                id: "Halo",
            },
            message: {
                locationMessage: {
                    name: "𝒖𝒕𝒆𝒏𝒕𝒊 𝒘𝒂𝒓𝒏𝒂𝒕𝒊",  // Scritta in miniatura
                    jpegThumbnail: profileBuffer, // Immagine in miniatura
                },
            },
            participant: "0@s.whatsapp.net",
        },
    });
};

handler.command = /^(listawarn)$/i;
handler.admin = true

export default handler;