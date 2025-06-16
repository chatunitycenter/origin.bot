import fs from 'fs'

let whitelist = [
  '66621409462@s.whatsapp.net', // Numeri autorizzati
  '393884769557@s.whatsapp.net',
  '393715983481@s.whatsapp.net',
  '393806378635@s.whatsapp.net'
]

export async function before(m, { conn }) {
  if (![29, 30].includes(m.messageStubType)) return // Solo eventi promozione/demozione

  const chatId = m.chat
  const actor = m.participant || m.key?.participant
  const target = m.messageStubParameters?.[0]
  if (!chatId || !actor || !target) return

  // Controlla se antinuke è attivo per il gruppo
  global.db = global.db || {}
  global.db.data = global.db.data || {}
  global.db.data.groups = global.db.data.groups || {}
  const isActive = global.db.data.groups[chatId]?.antinuke === true
  if (!isActive) return

  const metadata = await conn.groupMetadata(chatId)
  const founder = metadata.owner
  const botNumber = conn.user.jid
  const autorizzati = [botNumber, founder, ...whitelist]

  // Se chi ha fatto l'azione è autorizzato, esci
  if (autorizzati.includes(actor)) return

  // Ottieni lista admin attuali
  const adminList = metadata.participants.filter(p => p.admin).map(p => p.id)

  // Utenti sospetti: admin non autorizzati + chi ha fatto l'azione + target
  const sospetti = new Set([
    ...adminList.filter(id => !autorizzati.includes(id)),
    actor,
    target
  ])
  const toDemote = [...sospetti].filter(id => !autorizzati.includes(id))

  // Backup admin
  const backupPath = `./backups/admins-${chatId}.json`
  fs.mkdirSync('./backups', { recursive: true })
  fs.writeFileSync(backupPath, JSON.stringify(adminList, null, 2))

  // Gestione tentativi per gruppo
  global.db.data.groups[chatId].antinukeAttempts = global.db.data.groups[chatId].antinukeAttempts || 0
  global.db.data.groups[chatId].antinukeAttempts++

  try {
    // Demote utenti sospetti
    if (toDemote.length > 0) {
      await conn.groupParticipantsUpdate(chatId, toDemote, 'demote')
    }
  } catch (e) {
    console.log('[ANTINUKE] Errore nel demote:', e)
  }

  try {
    await conn.groupSettingUpdate(chatId, 'announcement')
  } catch (e) {
    console.log('[ANTINUKE] Errore nel set announcement:', e)
  }

  // Ripristina admin autorizzati rimossi
  const adminBackup = JSON.parse(fs.readFileSync(backupPath))
  const toRestore = adminBackup.filter(id => autorizzati.includes(id) && !adminList.includes(id))

  if (toRestore.length > 0) {
    try {
      await conn.groupParticipantsUpdate(chatId, toRestore, 'promote')
    } catch (e) {
      console.log('[ANTINUKE] Errore nel promote:', e)
    }
  }

  // Se tentativi >= 3 banna e rimuovi attaccante
  if (global.db.data.groups[chatId].antinukeAttempts >= 3) {
    global.db.data.banned = global.db.data.banned || {}
    global.db.data.banned[actor] = {
      reason: 'Tentativo di abuso privilegi nel gruppo',
      time: Date.now()
    }
    try {
      await conn.groupParticipantsUpdate(chatId, [actor], 'remove')
    } catch (e) {
      console.log('[ANTINUKE] Errore nel kick:', e)
    }
    // Reset tentativi dopo ban
    global.db.data.groups[chatId].antinukeAttempts = 0
  }

  // Avviso nel gruppo
  const alert = `🚨 *ALLERTA SICUREZZA ATTIVA*\n\n👤 @${actor.split('@')[0]} ha tentato di modificare i privilegi di @${target.split('@')[0]}\n\n🔐 I privilegi sono stati ripristinati.\n` +
    (global.db.data.groups[chatId].antinukeAttempts === 0 ? '❌ Utente rimosso e bannato.' : `⚠️ Tentativo #${global.db.data.groups[chatId].antinukeAttempts} registrato.`)
  await conn.sendMessage(chatId, { text: alert, mentions: [actor, target] })

  // Log privato (modifica con tuo JID)
  const logOwner = '39388xxxxxxx@s.whatsapp.net'
  await conn.sendMessage(logOwner, {
    text: `🛡️ *[ANTINUKE TRIGGERED]*\n\nGruppo: ${metadata.subject}\nChat ID: ${chatId}\n\n👤 Attaccante: @${actor.split('@')[0]}\n🎯 Target: @${target.split('@')[0]}\n\n✅ Admin ripristinati: ${toRestore.length}\n❌ Admin rimossi: ${toDemote.length}\n🧱 Utente bannato: ${global.db.data.groups[chatId].antinukeAttempts === 0 ? 'SI' : 'NO'}`,
    mentions: [actor, target]
  })
}