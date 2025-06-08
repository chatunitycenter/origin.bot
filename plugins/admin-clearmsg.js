// Clearmsg by Kinderino

let handler = async (m, { conn, args, isAdmin, isBotAdmin }) => {
  if (!m.isGroup) return m.reply("❌ Questo comando funziona solo nei gruppi.")
  if (!isBotAdmin) return m.reply("❌ Devo essere admin per poter cancellare i messaggi.")
  if (!isAdmin) return m.reply("❌ Solo gli admin possono usare questo comando.")

  let count = parseInt(args[0])
  if (!count || isNaN(count) || count <= 0) return m.reply("📌 Inserisci un numero valido di messaggi da cancellare.\nEsempio: `.clearmsg 10`")

  // Otteniamo i messaggi recenti dalla chat
  let msgs = Object.values(conn.chats[m.chat].messages).slice(-count - 1) // -1 per non includere il comando

  let deleted = 0
  for (let msg of msgs) {
    if (!msg.message) continue
    if (msg.key.id === m.key.id) continue // evita di cancellare il messaggio del comando stesso
    try {
      await conn.sendMessage(m.chat, { delete: msg.key })
      deleted++
    } catch (e) {
      console.log(`[Errore cancellando ${msg.key.id}]`, e)
    }
  }

  m.reply(`Cancellati ${deleted} messaggi con successo`)
}

handler.command = ['clearmsg', 'cancellamsg']
handler.help = ['clearmsg <numero>', 'cancellamsg <numero>']
handler.tags = ['gruppo']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
