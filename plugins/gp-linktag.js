import { generateWAMessageFromContent } from '@whiskeysockets/baileys'

let handler = async (m, { conn, participants }) => {
  let group = m.chat
  let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
  let users = participants.map(u => conn.decodeJid(u.id))
  let more = String.fromCharCode(8206)
  let masss = more.repeat(850)
  let text = `${link}`

  await conn.relayMessage(
    m.chat,
    {
      extendedTextMessage: {
        text: `${masss}\n${text}`,
        contextInfo: {
          mentionedJid: users,
          externalAdReply: {
            title: 'Invito al gruppo',
            body: 'Clicca per unirti',
            thumbnailUrl: null,
            mediaType: 1,
            renderLargerThumbnail: false,
            showAdAttribution: false,
            sourceUrl: link
          }
        }
      }
    },
    {}
  )
}

handler.command = /^linktag$/i
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler