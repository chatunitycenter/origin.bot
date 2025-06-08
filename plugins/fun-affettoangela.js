let handler = async (m, { conn, command, text, isOwner }) => {
    // Se il messaggio è inviato da un owner, la percentuale sarà 1000% con una frase speciale
    let percentage = isOwner ? 1000 : Math.floor(Math.random() * 101);

    // Determina il destinatario
    let target = text?.trim() || "te";

    // Frase finale basata sulla percentuale
    let finalPhrase = percentage === 1000 
        ? "💗 *Angela è pazza per te!*" 
        : percentage >= 70 
        ? "💘 *È destino! Angela ti vuole un mondo di bene!*" 
        : percentage >= 50 
        ? "💌 *Angela ti vuole bene, ma un po' di più non guasterebbe!*" 
        : "😕 *Potresti averle fatto qualcosa, prova a parlarci!...*";

    // Messaggio completo con grafica personalizzata
    let love = `
━━━━━━━━━━━━━━━━━━━━━━━
*CALCOLATORE DI AFFETTO ANGELA*
━━━━━━━━━━━━━━━━━━━━━━━
💕 *Affetto di Angela per ${target}*:    
✨ *${percentage}%* di amore! ✨
━━━━━━━━━━━━━━━━━━━━━━━
${finalPhrase}
`.trim();

    // Risposta con menzione
    m.reply(love, null, { mentions: conn.parseMention(love) });
};

handler.help = ['kai'];
handler.tags = ['fun'];
handler.command = /^(angela)$/i;

export default handler;
