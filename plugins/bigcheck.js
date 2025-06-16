import fs from 'fs'
import path from 'path'

let handler = async (m, { conn }) => {
  if (!m.quoted) {
    return m.reply('❗ Rispondi a un messaggio per analizzare il dispositivo usato.')
  }

  const quoted = m.quoted
  const msgID = quoted.id || quoted.key?.id || ''
  const senderJid = quoted.sender || m.sender
  const numero = senderJid.split('@')[0]
  const tagUtente = numero

  // 📱 Rilevamento dispositivo e connessione
  const detectDevice = (id) => {
    if (id.startsWith('false_') || id.startsWith('true_')) {
      return ['💻 WhatsApp Web', '🌐 Wi-Fi o Rete fissa']
    } else if (id.includes(':')) {
      return ['🖥️ WhatsApp Desktop', '🌐 Desktop (probabile)']
    } else if (/^[A-F0-9]{32}$/i.test(id)) {
      return ['📱 Android', '📶 Mobile/Wi-Fi']
    } else if (/^[0-9a-f\-]{36}$/i.test(id)) {
      return ['🍏 iOS', '📶 Mobile/Wi-Fi']
    } else if (id.startsWith('3EB0')) {
      return ['🤖 Android (vecchio schema)', '📶 Mobile (vecchio)']
    }
    return ['Dispositivo sconosciuto 🕵️‍♂️', '❓ Impossibile determinare']
  }

  const [device, connection] = detectDevice(msgID)

  // 🕰️ Calcolo tempo trascorso
  const now = Math.floor(Date.now() / 1000)
  const quotedTimestamp = quoted.messageTimestamp || quoted.key?.timestamp || now
  const delaySeconds = now - quotedTimestamp
  const delay = delaySeconds < 60
    ? `${delaySeconds}s`
    : delaySeconds < 3600
      ? `${Math.floor(delaySeconds / 60)}m`
      : `${Math.floor(delaySeconds / 3600)}h`

  const tipo = Object.keys(quoted.message || {}).join(', ') || 'Sconosciuto'
  const isForwarded = quoted.isForwarded ? '✅ Sì' : '❌ No'
  const dataOra = new Date(quotedTimestamp * 1000).toLocaleString('it-IT')

  // 📸 Foto profilo
  let pp = 'https://telegra.ph/file/0d7e77764ac7c5a02026c.png'
  try {
    pp = await conn.profilePictureUrl(senderJid, 'image')
  } catch { }

  // 📝 Biografia (stato)
  let status = '⚠️ Impossibile ottenere lo stato'
  try {
    const info = await conn.fetchStatus(senderJid)
    if (info?.status) status = info.status
  } catch { }

  // 📄 Creazione testo report
  const text = `
📍 Analisi Messaggio

👤 Utente: @${tagUtente}
📞 Numero: +${numero}
📜 Bio: ${status}
🕰️ Data/Ora messaggio: ${dataOra}
⏱️ Tempo trascorso: ${delay}
📩 Messaggio inoltrato: ${isForwarded}
📂 Tipo messaggio: ${tipo}
💽 Dispositivo: ${device}
📡 Connessione stimata: ${connection}
🆔 ID Messaggio: ${msgID}
`.trim()

  // 📁 Gestione file temporaneo
  const folder = './temp'
  const fileName = `report-${tagUtente}.txt`
  const filePath = path.join(folder, fileName)

  try {
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true })
    fs.writeFileSync(filePath, text)

    // 📸 Invio profilo + stato
    await conn.sendMessage(m.chat, {
      image: { url: pp },
      caption: `👤 Profilo di @${tagUtente}\n📜 Bio: ${status}`,
      mentions: [senderJid]
    }, { quoted: m })

    // 📄 Invio report
    await conn.sendMessage(m.chat, {
      document: fs.readFileSync(filePath),
      fileName,
      mimetype: 'text/plain',
      caption: `📄 Report tecnico per @${tagUtente}`,
      mentions: [senderJid]
    }, { quoted: m })
  } catch (e) {
    console.error(e)
    return m.reply('❌ Si è verificato un errore nella generazione del report.')
  } finally {
    // 🧹 Pulizia file temporaneo
    setTimeout(() => {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    }, 30_000)
  }
}

handler.command = /^(bigcheck|device|dispositivo|report)$/i
handler.group = true
export default handler