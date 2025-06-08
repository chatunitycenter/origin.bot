import { performance } from 'perf_hooks'

let handler = async (m, { conn }) => {
  let _uptime = process.uptime() * 1000
  let uptime = clockString(_uptime)
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
  const groups = chats.filter(([id]) => id.endsWith('@g.us'))
  let old = performance.now()
  let neww = performance.now()
  let speed = neww - old
  let info = `
*COSA VUOI FARE?!*\n*SOLO KATA PUÒ SVUOTARE I GRUPPI 😈😈*`.trim()
  conn.reply(m.chat, info, m, false)
}

handler.help = ['nike']
handler.tags = ['fun']
handler.command = /^(nike)$/i
export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}