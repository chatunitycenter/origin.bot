const flags = require('./bandiere.json');

let current = {};
let inGame = {};

let handler = async (m, { conn }) => {
    if (inGame[m.chat]) return m.reply("Una bandiera è già in corso in questa chat!");

    const flag = flags[Math.floor(Math.random() * flags.length)];
    current[m.chat] = {
        flag,
        wrong: 0,
        starter: m.sender,
        active: true,
    };
    inGame[m.chat] = true;

    await conn.sendMessage(m.chat, {
        text: `Indovina la bandiera: ${flag.emoji}\n> Scrivi: .indovina <nome stato>`,
    });

    setTimeout(async () => {
        if (current[m.chat]?.active) {
            await conn.sendMessage(m.chat, {
                text: `⏰ Tempo scaduto! La risposta corretta era: ${flag.name.toUpperCase()} ${flag.emoji}`
            });
            delete current[m.chat];
            delete inGame[m.chat];
        }
    }, 60000);
};

handler.help = ['bandiera'];
handler.tags = ['game'];
handler.command = ['bandiera'];

module.exports = handler;


let handlerGuess = async (m, { args, conn }) => {
    if (!current[m.chat] || !current[m.chat].active) return;

    const guess = normalize(args.join(" ").toLowerCase());
    const correct = normalize(current[m.chat].flag.name.toLowerCase());
    const user = m.sender;

    if (!global.db.data.users[user]) {
        global.db.data.users[user] = { messaggi: 0, vittorie: 0, sconfitte: 0 };
    }

    if (guess === correct) {
        current[m.chat].active = false;
        global.db.data.users[user].messaggi += 10;
        global.db.data.users[user].vittorie++;

        await conn.sendMessage(m.chat, {
            text: `✅ Esatto! ${current[m.chat].flag.emoji} era ${current[m.chat].flag.name.toUpperCase()}!\n+10 messaggi per @${user.split('@')[0]}`,
            mentions: [user]
        });

        delete current[m.chat];
        delete inGame[m.chat];
    } else {
        current[m.chat].wrong++;
        if (current[m.chat].wrong >= 3) {
            global.db.data.users[user].messaggi -= 5;
            global.db.data.users[user].sconfitte++;

            await conn.sendMessage(m.chat, {
                text: `❌ Troppi errori! La risposta era ${current[m.chat].flag.name.toUpperCase()} ${current[m.chat].flag.emoji}`
            });

            delete current[m.chat];
            delete inGame[m.chat];
        } else {
            await conn.sendMessage(m.chat, {
                text: `❌ Sbagliato! Tentativi rimasti: ${3 - current[m.chat].wrong}`
            });
        }
    }
};

handlerGuess.help = ['indovina <nome stato>'];
handlerGuess.tags = ['game'];
handlerGuess.command = ['indovina'];

module.exports.indovina = handlerGuess;