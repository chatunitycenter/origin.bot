//comando migliorato da Youns
import translate from '@vitalets/google-translate-api';
import fetch from 'node-fetch';

let handler = async (m, { args, usedPrefix, command }) => {
    let msg = `Uso del comando: ${usedPrefix + command} <lingua> <testo o messaggio taggato>`;

    if (!args || args.length === 0) return m.reply(msg);

    let lang = args[0];
    let text = args.slice(1).join(' ');

    const defaultLang = 'it';

    if (lang.length !== 2) {
        lang = defaultLang;
        text = args.join('it');
    }

    if (!text && m.quoted && m.quoted.text) text = m.quoted.text;

    if (!text) return m.reply("Nessun testo da tradurre trovato.");

    try {
        let result = await translate(text, { to: lang, autoCorrect: true });
        await m.reply('Traduzione: ' + result.text);
    } catch (e) {
        try {
            let lol = await fetch(`https://api.lolhuman.xyz/api/translate/auto/${lang}?apikey=${lolkeysapi}&text=${encodeURIComponent(text)}`);
            let loll = await lol.json();
            let result2 = loll.result.translated;
            await m.reply('Traduzione: ' + result2);
        } catch (err) {
            await m.reply('Errore durante la traduzione.');
            console.error(err);
        }
    }
};

handler.command = /^(translate|traduci|trad)$/i;
export default handler;
