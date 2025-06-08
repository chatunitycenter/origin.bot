import QRCode from 'qrcode'

let handler = async (m, { conn }) => {
    let group = m.chat
    try {
        let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
        let qr = await QRCode.toDataURL(link) // Genera il codice QR in formato immagine (base64)

        // Immagine in miniatura e scritta personalizzata
        const thumbnailUrl = "https://qu.ax/EtWDe.png"; // URL dell'immagine in miniatura
        const thumbnailBuffer = await (await fetch(thumbnailUrl)).buffer();
        const thumbnailText = "𝑸𝑹 𝑪𝒐𝒅𝒆 𝒅𝒆𝒍 𝒈𝒓𝒖𝒑𝒑𝒐 🔎";

        await conn.sendMessage(m.chat, { 
            image: Buffer.from(qr.split(',')[1], 'base64'), 
            caption: '> 𝐂𝐨𝐝𝐢𝐜𝐞 𝐐𝐑 𝐝𝐢 𝐪𝐮𝐞𝐬𝐭𝐨 𝐠𝐫𝐮𝐩𝐩𝐨' 
        }, { 
            quoted: {
                key: {
                    participants: "0@s.whatsapp.net",
                    fromMe: false,
                    id: "Halo",
                },
                message: {
                    locationMessage: {
                        name: thumbnailText, // Testo in miniatura
                        jpegThumbnail: thumbnailBuffer, // Immagine in miniatura
                    },
                },
                participant: "0@s.whatsapp.net",
            },
        });
    } catch {
        await conn.reply(m.chat, '𝐄𝐫𝐫𝐨𝐫𝐞 ⚠️', m)
    }
}

handler.command = /^qr$/i
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler