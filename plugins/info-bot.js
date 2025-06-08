import fs from 'fs'

const toMathematicalAlphanumericSymbols = number => {
  const map = {
    '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓',
    '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗'
  }
  return number.toString().split('').map(digit => map[digit] || digit).join('')
}

const handler = async (m, { conn, usedPrefix, command }) => {
  let ownerList = ''
  for (const [ownerNumber] of global.owner) {
    ownerList += `wa.me/${ownerNumber}\n`
  }

  const mention = m.mentionedJid?.[0] || m.quoted?.sender || m.quoted
  const who = mention || m.sender
  const user = global.db.data.users[who] || {}
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
  const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'))
  let totalreg = Object.keys(global.db.data.users).length
  let rtotalreg = Object.values(global.db.data.users).filter(user => user.instagram).length
  const totalPlugins = Object.keys(global.plugins).length

  const image = fs.readFileSync('./icone/settings.png')

  let prova = {
    key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
    message: {
      locationMessage: {
        name: `𝐈𝐧𝐟𝐨 ${global.nomebot}`,
        jpegThumbnail: image,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    participant: "0@s.whatsapp.net"
  }

  conn.sendMessage(m.chat, {
    text: `══════•⊰✦⊱•══════
𝐏𝐞𝐫 𝐯𝐞𝐝𝐞𝐫𝐞 𝐢 𝐜𝐨𝐦𝐚𝐧𝐝𝐢 𝐮𝐬𝐚𝐫𝐞 ${usedPrefix}𝐦𝐞𝐧𝐮

➣ 𝐆𝐫𝐮𝐩𝐩𝐢: ${toMathematicalAlphanumericSymbols(groupsIn.length)}
➣ 𝐂𝐡𝐚𝐭 𝐩𝐫𝐢𝐯𝐚𝐭𝐞: ${toMathematicalAlphanumericSymbols(chats.length - groupsIn.length)}
➣ 𝐂𝐡𝐚𝐭 𝐭𝐨𝐭𝐚𝐥𝐢: ${toMathematicalAlphanumericSymbols(chats.length)}
➣ 𝐔𝐭𝐞𝐧𝐭𝐢 𝐫𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐭𝐢: ${toMathematicalAlphanumericSymbols(totalreg)}
➣ 𝐈𝐠 𝐫𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐭𝐢: ${toMathematicalAlphanumericSymbols(rtotalreg)}/${toMathematicalAlphanumericSymbols(totalreg)}
➣ 𝐏𝐥𝐮𝐠𝐢𝐧𝐬: ${toMathematicalAlphanumericSymbols(totalPlugins)}
➣ 𝐎𝐰𝐧𝐞𝐫:\n${ownerList}══════•⊰✦⊱•══════`
  }, { quoted: prova })
}

handler.command = ['infobot', 'bot']
export default handler
