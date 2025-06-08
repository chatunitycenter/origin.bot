import fetch from 'node-fetch'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m, { conn, quoted }) => {
  if (!quoted) throw '❌ Rispondi a un messaggio contenente una *foto*!'

  // Prova a estrarre correttamente l'immagine anche da messaggi "nascosti"
  let q = quoted.message
  let type = Object.keys(q)[0]
  let imgMsg = (type === 'imageMessage') ? quoted : (q[type].contextInfo?.quotedMessage?.imageMessage ? { message: { imageMessage: q[type].contextInfo.quotedMessage.imageMessage } } : null)

  if (!imgMsg) throw '❌ Il messaggio a cui hai risposto non contiene un\'immagine valida.'

  try {
    // Scarica e carica l'immagine
    let media = await conn.downloadAndSaveMediaMessage(quoted)
    let url = await uploadImage(media)

    // Chiamata all’API
    let api = `https://apis-starlights-team.koyeb.app/starlight/describe-picture?url=${encodeURIComponent(url)}&lang=it`
    let res = await fetch(api)
    let json = await res.json()

    if (!json || !json.result) throw '❌ Non sono riuscito a descrivere l\'immagine.'

    m.reply(`🖼️ *Descrizione dell'immagine:*\n\n${json.result}`)
  } catch (e) {
    console.error(e)
    m.reply('⚠️ Errore durante l\'analisi dell\'immagine.')
  }
}

handler.command = /^descrivi$/i
handler.help = ['descrivi (rispondi a una foto)']
handler.tags = ['tools']
handler.register = true

export default handler
