import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
    // Ignora i messaggi inviati dal bot
    if (m.fromMe) return;

    // Controlla se la funzione sticker è attiva nella chat
    let chatConfig = global.db.data.chats[m.chat] || {};
    if (!chatConfig.stickers) return;

    // Mappa dei nomi di cartelle e dei rispettivi prefix
    const stickersMap = {
        'tonio': './storage/stickersTonio',
        'orca': './storage/stickersOrca',
        'cessa': './storage/stickersOrca',
        'gesu': './storage/stickersGesu',
        'gesù': './storage/stickersGesu',
        'cristo': './storage/stickersGesu',
        'claudio': './storage/stickersClaudio',
        'zio f': './storage/stickersZio',
        'francesco': './storage/stickersZio',
        'simo': './storage/stickersSimo',
        'lotta': './storage/stickersSimo',
        'wwe': './storage/stickersSimo',
        'wrestling': './storage/stickersSimo',
        'storto': './storage/stickersSimo',
        'leo': './storage/stickersLeo',
        'placentino': './storage/stickersLeo',
        'manu': './storage/stickersManu',
        'emanuele': './storage/stickersManu',
        'carmine': './storage/stickersCarmine',
        'mutandelle': './storage/stickersCarmine',
        'calzetelle': './storage/stickersCarmine',
        '1715': './storage/stickersCarmine',
        '1615': './storage/stickersCarmine',
        '1815': './storage/stickersCarmine',
        'poleseta': './storage/stickersCarmine',
        'carla': './storage/stickersCarla',
        'nigga': './storage/stickersCarla',
        'negr': './storage/stickersCarla',
        'disabile': './storage/stickersCarla',
        'andicap': './storage/stickersCarla',
        'finocchia': './storage/stickersCarla',
        'down': './storage/stickersCarla',
        'michelle': './storage/stickersCarla',
        'sosa': './storage/stickersCarla',
        'nera': './storage/stickersCarla',
        'nero': './storage/stickersCarla',
        'neri': './storage/stickersCarla',
        'nere': './storage/stickersCarla',
        'negr': './storage/stickersCarla',
        'black': './storage/stickersCarla',
        'coño': './storage/stickersCarla',
        'coñazo': './storage/stickersCarla',
        'mario': './storage/stickersMario',
        'pedo': './storage/stickersMario',
    };

    // Trova il prefisso che corrisponde al messaggio
    let matchedPrefix = Object.keys(stickersMap).find(prefix => new RegExp(prefix, 'i').test(m.text));

    // Se non c'è corrispondenza, esci
    if (!matchedPrefix) return;

    // Ottieni la cartella corrispondente al prefisso
    const stickersFolder = stickersMap[matchedPrefix];

    // Ottieni tutti i file dalla cartella stickers
    const files = fs.readdirSync(stickersFolder);

    // Filtra solo i file con estensione .webp
    const webpFiles = files.filter(file => path.extname(file) === '.webp');

    // Se non ci sono file .webp, esci
    if (webpFiles.length === 0) {
        return m.reply('Non ci sono sticker disponibili!');
    }

    // Seleziona un file casuale dalla lista
    const randomSticker = webpFiles[Math.floor(Math.random() * webpFiles.length)];

    // Crea il percorso completo del file selezionato
    const stickerPath = path.join(stickersFolder, randomSticker);

    // Invia lo sticker come messaggio
    try {
        // Leggi il file sticker
        const sticker = fs.readFileSync(stickerPath);

        // Invia lo sticker
        await conn.sendMessage(m.chat, {
            sticker: sticker  // Invia il file come sticker
        }, { quoted: m });

    } catch (error) {
        console.error('Errore nell\'invio dello sticker:', error);
        m.reply('Errore nell\'invio dello sticker.');
    }
}

handler.customPrefix = /tonio|orca|cessa|gesu|gesù|cristo|claudio|zio|francesco|simo|lotta|wwe|wrestling|storto|mario|pedo|leo|placentino|emanuele|manu|carmine|mutandelle|calzetelle|1615|1715|1815|poleseta|carla|nigga|negr|disabile|andicappat|andicappafrocia|mongolodown|mongoladown|andicap|ricchionfinocchia|finocchia|michelle|sosa|nero|nera|black|coño|coñazo/i;
handler.command = new RegExp();

export default handler;