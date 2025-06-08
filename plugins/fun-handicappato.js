let handler = async (m, { conn, command, text }) => {
   
    let genere = command === "104" ? "104" : "208";

    
    let love = `
━━━━━━━━━━━━━━━━━━━━━━
*🌀 CALCOLATORE DI HANDICAP🌀*
━━━━━━━━━━━━━━━━━━━━━━
🤔 *${text} è ${genere} al ${Math.floor(Math.random() * 101)}%!*
━━━━━━━━━━━━━━━━━━━━━━
*Ecco perché fai così* 🤣 
`.trim();

    m.reply(love, null, { mentions: conn.parseMention(love) });
};

handler.command = /^(104|208)$/i;
export default handler;
