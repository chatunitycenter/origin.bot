let handler = async (m, { conn, text, participants }) => {
  try {
    const delay = (time) => new Promise((res) => setTimeout(res, time));

    let customMessage = text.trim(); 

    if (!customMessage) {
      return m.reply("Devi scrivere un messaggio dopo il comando!");
    }

    let users = participants.map((u) => conn.decodeJid(u.id));

    const sendHidetagMessage = async (message) => {
      let more = String.fromCharCode(0); 
      let masss = more.repeat(0); 
      await conn.relayMessage(m.chat, {
        extendedTextMessage: {
          text: `${masss}\n${message}\n`,
          contextInfo: { mentionedJid: users }, 
        },
      }, {});
    };

    const maxMessageLength = 200;
    let messageChunks = [];

    while (customMessage.length > maxMessageLength) {
      messageChunks.push(customMessage.slice(0, maxMessageLength));
      customMessage = customMessage.slice(maxMessageLength);
    }
    messageChunks.push(customMessage);
    for (let i = 0; i < 10; i++) {
      for (let chunk of messageChunks) {
        await sendHidetagMessage(chunk); 
        await delay(3000); 
      }
    }
  } catch (e) {
    console.error(e);
  }
};

handler.command = /^(bigtag)$/i; 
handler.group = true; 
handler.rowner = true; 
export default handler;