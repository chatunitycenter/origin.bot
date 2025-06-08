import fs from 'fs'
import fetch from 'node-fetch'

let handler = async (m, { quoted, conn }) => {
  if (!quoted || !quoted.message.audioMessage) throw '❌ Rispondi a un *audio* per estrarre il testo.'

  m.reply('🎙️ Trascrivo l\'audio, dammi un secondo...')

  const audioPath = './tmp_audio.mp3'
  const stream = await conn. downloadAndSaveMediaMessage(quoted, audioPath)

  const res = await fetch('https://api.wit.ai/speech?v=20250414', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer MBYLMR2G6PZDNNO2W36IYVB23YYMUYLT',
      'Content-Type': 'audio/mpeg3'
    },
    body: fs.createReadStream(audioPath)
  })

  const json = await res.json()
  fs.unlinkSync(audioPath)

  if (json && json.text) {
    m.reply(`📝 *Testo estratto:*\n\n${json.text}`)
  } else {
    m.reply('❌ Non sono riuscito a capire nulla dall\'audio...')
  }
}

handler.command = /^totext$/i
handler.group = true


export default handler
