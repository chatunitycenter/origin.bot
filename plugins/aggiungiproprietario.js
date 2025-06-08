import fs from 'fs'

const handler = async (m, { conn, usedPrefix, command }) => {
  // Verifica che il comando sia eseguito dal bot stesso
  if (m.sender !== conn.user.jid) {
    return conn.reply(m.chat, 'Solo il bot può eseguire questo comando.', m)
  }

  // Verifica che ci sia un @tag (menzionato) e un nome
  const mentioned = m.mentionedJid[0] || m.quoted?.sender
  if (!mentioned) {
    return conn.reply(m.chat, 'Devi taggare una persona per aggiungerla come proprietario.', m)
  }

  const name = m.quoted ? m.quoted.text : m.text.split(' ').slice(1).join(' ') // Ottieni il nome dalla parte del testo dopo il comando

  // Estrai il numero di telefono della persona taggata
  const number = mentioned.split('@')[0]

  // Aggiungi il nuovo proprietario a global.owner
  const newOwner = [number, name, true]
  global.owner.push(newOwner)

  // Salva i cambiamenti su config.js
  const configPath = './config.js'
  const configFile = fs.readFileSync(configPath, 'utf8')
  const updatedConfig = configFile.replace(
    /global\.owner\s*=\s*\[[^\]]*\]/,
    `global.owner = ${JSON.stringify(global.owner)}`
  )

  fs.writeFileSync(configPath, updatedConfig)

  conn.reply(m.chat, `${name} è stato aggiunto come proprietario del bot!`, m)
}

handler.command = ['aggiungiproprietario', 'addowner']
export default handler
