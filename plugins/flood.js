let handler = async (m, { conn }) => {
  // Numero di messaggi da inviare
  let count = 30;

  // Funzione per inviare e cancellare i messaggi
  let sendAndDelete = async () => {
    for (let i = 0; i < count; i++) {
      let sentMessage = await conn.sendMessage(m.chat, { text: '𝔾𝕝𝕚 𝕤𝕔𝕣𝕚𝕥𝕥𝕠𝕣𝕚 𝕣𝕖𝕘𝕟𝕒𝕟𝕠📖' });

      // Cancellazione del messaggio inviato per l'utente
      setTimeout(async () => {
        await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, id: sentMessage.key.id } });
      }, 1000); // Cancella il messaggio dopo 1 secondo

      // Aggiungi un ritardo per inviare il messaggio successivo
      // Dà tempo di cancellare il messaggio precedente prima di inviarne uno nuovo
      await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5 secondi tra ogni messaggio
    }
  };

  // Esegui la funzione sendAndDelete
  sendAndDelete();
};

handler.command = /^(spam)$/i;
export default handler;
