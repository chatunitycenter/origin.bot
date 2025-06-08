const handler = async (m, { conn }) => {
  try {
    await conn.sendMessage(m.chat, {
      disappearingMessagesInChat: 7776000 // 90 giorni in secondi
    });
    await m.reply('✅ I messaggi effimeri sono stati attivati per *90 giorni* in questa chat.');
  } catch (e) {
    console.error(e);
    await m.reply('❌ Errore durante l\'attivazione dei messaggi effimeri.');
  }
};

handler.command = /^effimero$/i;
handler.help = ['effimero'];
handler.tags = ['funzione'];

export default handler;