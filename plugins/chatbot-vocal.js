import fetch from 'node-fetch';
import gtts from 'node-gtts';
import { readFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import ffmpeg from 'fluent-ffmpeg'; // Per modificare la velocità dell'audio

const defaultLang = 'it'; // Lingua di default per la sintesi vocale
const defaultResponse = "Cazzo vuoi"; // Frase di default

async function tts(text, lang = 'it') {
    return new Promise((resolve, reject) => {
        try {
            let tts = gtts(lang);
            let filePath = join(global.__dirname(import.meta.url), '../tmp', `${Date.now()}.mp3`);
            tts.save(filePath, text, () => {
                resolve(filePath);
            });
        } catch (e) {
            reject(e);
        }
    });
}

// Funzione per modificare la velocità dell'audio con FFmpeg
function changeAudioSpeed(inputFilePath, outputFilePath, speed = 1.5) {
    return new Promise((resolve, reject) => {
        ffmpeg(inputFilePath)
            .audioFilters(`atempo=${speed}`)
            .on('end', () => resolve(outputFilePath))
            .on('error', reject)
            .save(outputFilePath);
    });
}

var handler = async (m, { text, usedPrefix, command, conn }) => {
    if (!text) {
        // Se non c'è testo, usa la risposta predefinita
        text = defaultResponse;
    }

    try {
        conn.sendPresenceUpdate('recording', m.chat);

        let responseText;

        // Se c'è testo, scegli la personalità casuale
        const personalitàPossibili = ["ribelle", "dominatore", "psicopatico", "maniaco"];
        let personality = personalitàPossibili[Math.floor(Math.random() * personalitàPossibili.length)];

        let prompt = "";

        // Gestione delle personalità
        if (personality === "ribelle") {
            prompt = `Sei un bot su WhatsApp che si comporta da ragazzo ribelle e divertente. Se ti insulto, insultami, devi insultarmi anche per gioco, ma senza dire che lo fai di proposito. Non devi rispondere come un secchione, qualsiasi cosa io dica o chieda. Mantieni sempre questo ruolo e rispondi in modo naturale e sarcastico. Questa è la mia domanda/affermazione: "${text}"`;

        } else if (personality === "dominatore") {
            prompt = `Sei un bot con un atteggiamento freddo, dominante e diretto. Non perdi tempo con chiacchiere inutili, rispondi con poche parole ma con sicurezza. Se ti insultano, rispondi in modo tagliente. Sei logico, impassibile e controlli sempre la conversazione. Rispondi in modo breve e deciso, senza emozioni. Questa è la mia domanda/affermazione: "${text}"`;

        } else if (personality === "psicopatico") {
            prompt = `Sei un bot che si comporta da pazzo psicopatico, imprevedibile e disturbato. Ridi a caso, fai battute macabre e hai uno stile inquietante. Non hai filtri, ma devi comunque risultare divertente. Se qualcuno ti provoca, rispondi in modo bizzarro o minaccioso. Mantieni sempre questo stile instabile. Questa è la mia domanda/affermazione: "${text}"`;

        } else if (personality === "maniaco") {
            prompt = `Sei un bot maniaco del controllo, ossessionato dalla perfezione. Correggi anche il minimo errore, sei pignolo, preciso e giudichi chiunque non sia all’altezza dei tuoi standard. Rispondi sempre con tono superiore e leggermente passivo-aggressivo. Questa è la mia domanda/affermazione: "${text}"`;
        }

        // Richiesta all'API AI con il prompt personalizzato
        let apii = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(prompt)}`);
        let res = await apii.json();
        responseText = res.result || "Non ho capito, puoi ripetere?";

        // Trasforma la risposta in audio
        let audioPath = await tts(responseText, defaultLang);

        // Definisci il percorso per il file audio con velocità modificata
        let modifiedAudioPath = join(global.__dirname(import.meta.url), '../tmp', `${Date.now()}_modified.mp3`);

        // Cambia la velocità dell'audio
        await changeAudioSpeed(audioPath, modifiedAudioPath, 1.3);  // Imposta la velocità a 1.3x

        // Invia il file audio modificato come risposta vocale
        conn.sendFile(m.chat, modifiedAudioPath, 'risposta.mp3', null, m, true);

        // Pulisce i file dopo l'invio
        unlinkSync(audioPath);
        unlinkSync(modifiedAudioPath);

    } catch (e) {
        await conn.reply(m.chat, `Errore: ${e.message}\nRiprova più tardi.`, m);
        console.error(`Errore nel comando ${usedPrefix + command}:`, e);
    }
};

handler.command = ['vocal', 'vocale'];
handler.help = ['ai', 'chatbot'];
handler.tags = ['tools'];
handler.premium = false;

export default handler;
