import { performance } from "perf_hooks";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let handler = async (message, { conn, text }) => {
    const mention = message.mentionedJid?.[0];
    let displayName = text || "te";
    let mentions = [];

    if (mention) {
        displayName = `@${mention.split('@')[0]}`;
        mentions = [mention];
    }

    const messages = [
        `🍢 Inizio a preparare un Kebab per *${displayName}*...`,
        `🍖 Sto affettando la carne!`,
        `🥗 Aggiungo le verdure fresche...`,
        `🫓 Prendo il pane caldo.`,
        `🌶️ Un tocco di salsa segreta!`,
        `🔥 Il Kebab è quasi pronto...`,
        `🥙 Voilà! Kebab servito per *${displayName}*!`
    ];

    for (let msg of messages) {
        await conn.sendMessage(message.chat, { text: msg, mentions }, { quoted: message });
        await delay(2000);
    }

    const time = (performance.now() - performance.now()).toFixed(3);
    const finalMessage = `🍢 Kebab preparato in *${time}ms*! Buon appetito, *${displayName}*!`;

    await conn.sendMessage(message.chat, { text: finalMessage, mentions }, { quoted: message });
};

handler.command = ['kebab'];
handler.tags = ['fun'];
handler.help = ['.kebab @nome'];

export default handler;