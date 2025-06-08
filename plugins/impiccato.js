import fs from 'fs'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    conn.hangman = conn.hangman || {}

    if (!text) throw `*[❗] DEVI DARE UN NOME ALLA SALA*\n\n—◉ ESEMPIO:\n◉ ${usedPrefix + command} parola-magica`

    let userInGame = Object.values(conn.hangman).find(r =>
        r.id.startsWith('hangman') && [r.creator, r.joiner].includes(m.sender))
    if (userInGame) throw '[❗] STAI GIOCANDO IN UN’ALTRA PARTITA!'

    let room = Object.values(conn.hangman).find(r => r.state === 'WAITING' && r.name === text)

    if (room) {
        room.joiner = m.sender
        room.state = 'PLAYING'
        room.chat = m.chat

        startHangmanGame(room, conn, m)
    } else {
        let wordList = fs.readFileSync('./files/parole.txt').toString().trim().split('\n')
        let secret = pickRandom(wordList).toUpperCase()
        let hidden = secret.replace(/[A-Z]/g, '_')

        let newRoom = {
            id: 'hangman-' + Date.now(),
            name: text,
            secret,
            display: hidden,
            creator: m.sender,
            joiner: null,
            attempts: [],
            fails: 0,
            state: 'WAITING',
            chat: m.chat,
            turn: m.sender
        }

        conn.hangman[newRoom.id] = newRoom

        conn.reply(m.chat, `🎮 Sala *${text}* creata!\nAspettando un altro giocatore...\n\n📝 Digita *.entra ${text}* per partecipare.`, null, m)
    }
}
handler.command = /^(impiccato|entra)$/i
export default handler

// Funzione per iniziare la partita
async function startHangmanGame(room, conn, m) {
    let { creator, joiner, secret, display } = room
    let msg = `
🎮 *GIOCO DELL'IMPICCATO*

🧑‍🤝‍🧑 ${mentionUser(creator)} vs ${mentionUser(joiner)}
🕹️ Parola da indovinare: ${display.split('').join(' ')}

📌 Tocca a ${mentionUser(room.turn)}
Scrivi una lettera (.a .b .c ...) o prova a indovinare tutta la parola (.indovina parola)
`.trim()
    conn.sendMessage(room.chat, { text: msg, mentions: [creator, joiner] })
}

// Funzione per menzionare utenti
function mentionUser(jid) {
    return `@${jid.split('@')[0]}`
}

// Utility
function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}