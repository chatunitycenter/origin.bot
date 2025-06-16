let handler = async (m, { conn }) => {
  const messaggio = `
🛍️ *PACCHETTI MULTIPLI*

Puoi acquistare più pacchetti insieme e aprirli uno dopo l’altro:

📦 *Base ×3*  
👑 *Imperium ×5*  
🌌 *Premium ×10*

Scegli se comprarli o aprirli se li hai già!
`.trim();

  await conn.sendMessage(m.chat, {
    text: messaggio,
    footer: '💡 Usa i bottoni per comprare o aprire rapidamente.',
    buttons: [
      { buttonId: '.buy base 3', buttonText: { displayText: '📦 Compra Base ×3' }, type: 1 },
      { buttonId: '.buy imperium 5', buttonText: { displayText: '👑 Compra Imperium ×5' }, type: 1 },
      { buttonId: '.buy premium 10', buttonText: { displayText: '🌌 Compra Premium ×10' }, type: 1 },
      { buttonId: '.apri base', buttonText: { displayText: '📬 Apri Base' }, type: 1 },
      { buttonId: '.apri imperium', buttonText: { displayText: '📬 Apri Imperium' }, type: 1 },
      { buttonId: '.apri premium', buttonText: { displayText: '📬 Apri Premium' }, type: 1 }
    ]
  }, { quoted: m });
};

handler.help = ['pacchetti-multipli'];
handler.tags = ['pokemon'];
handler.command = /^pacchetti-multipli$/i;

export default handler;