let handler = async (m, { conn, command, args, usedPrefix }) => {
    let user = m.sender
    global.db.data.users[user] = global.db.data.users[user] || {}
    let userData = global.db.data.users[user]
    userData.mattecash = userData.mattecash || 0
    userData.lastBonus = userData.lastBonus || 0

    if (command === 'mattecash') {
        return m.reply(`💰 Hai *${userData.mattecash}* Mattecash!`)
    }

    if (command === 'bonus') {
        let now = Date.now()
        let oneDay = 24 * 60 * 60 * 1000
        if (now - userData.lastBonus < oneDay) {
            let remaining = ((userData.lastBonus + oneDay) - now)
            let hours = Math.floor(remaining / (1000 * 60 * 60))
            let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
            return m.reply(`⏳ Hai già preso il bonus oggi!\nRiprova tra ${hours}h ${minutes}m.`)
        }

        let reward = 50
        userData.mattecash += reward
        userData.lastBonus = now
        return m.reply(`🎁 Hai ricevuto *${reward}* Mattecash come bonus giornaliero!`)
    }

    if (command === 'addcash') {
        if (!m.isGroup && !m.fromMe) return m.reply('❌ Solo admin o il proprietario possono usare questo comando.')
        let mentioned = m.mentionedJid[0]
        let amount = parseInt(args[1])
        if (!mentioned || isNaN(amount)) return m.reply(`❌ Uso corretto:\n${usedPrefix}addcash @utente <quantità>`)
        global.db.data.users[mentioned] = global.db.data.users[mentioned] || {}
        global.db.data.users[mentioned].mattecash = (global.db.data.users[mentioned].mattecash || 0) + amount
        return m.reply(`✅ Aggiunti *${amount}* Mattecash a @${mentioned.split('@')[0]}`, null, { mentions: [mentioned] })
    }
}

handler.help = ['mattecash', 'bonus', 'addcash <@utente> <quantità>']
handler.tags = ['economia']
handler.command = /^(mattecash|bonus|addcash)$/i

export default handler