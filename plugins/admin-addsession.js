import fs from 'fs'
import path from 'path'

const handler = async (m, { conn, usedPrefix }) => {
  const groupId = m.chat
  const sessionFolder = './Sessioni'

  // Controlla se è un gruppo
  if (!groupId.endsWith('@g.us')) {
    return conn.sendMessage(m.chat, { text: '⚠️ Questo comando va usato in un gruppo.' }, { quoted: m })
  }

  // Crea la cartella Sessioni se non esiste
  if (!fs.existsSync(sessionFolder)) {
    fs.mkdirSync(sessionFolder)
  }

  // Crea un file simbolico per la sessione del gruppo
  const sessionFile = path.join(sessionFolder, `${groupId}.session`)
  if (fs.existsSync(sessionFile)) {
    return conn.sendMessage(m.chat, { text: '✅ La sessione di questo gruppo è già stata registrata.' }, { quoted: m })
  }

  fs.writeFileSync(sessionFile, '') // File vuoto

  await conn.sendMessage(m.chat, {
    text: `✅ Sessione per questo gruppo creata con successo!\n🗂 Nome file: ${groupId}.session`
  }, { quoted: m })
}

handler.help = ['addsession']
handler.tags = ['owner']
handler.command = /^addsession$/i


export default handler