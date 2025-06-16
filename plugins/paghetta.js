let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender] || { mattecash: 0, lastclaim: 0 };

  let fkontak = {
    "key": {
      "participants": "0@s.whatsapp.net",
      "remoteJid": "status@broadcast",
      "fromMe": false,
      "id": "Halo"
    },
    "message": {
      "contactMessage": {
        displayName: '𝐏𝚲𝐆𝐇𝚵𝐓𝕋𝚲',
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    "participant": "0@s.whatsapp.net"
  };

  let currentTime = new Date().getTime();
  let timePassed = currentTime - (user.lastclaim || 0);

  if (timePassed < 60 * 60 * 1000) { // meno di 1 ora
    let remainingTime = 60 * 60 * 1000 - timePassed;
    let remainingTimeString = msToTime(remainingTime);
    return await conn.reply(m.chat, `𝐃𝐞𝐯𝐢 𝐚𝐬𝐩𝐞𝐭𝐭𝐚𝐫𝐞 𝐚𝐧𝐜𝐨𝐫𝐚 *${remainingTimeString}* 𝐩𝐫𝐢𝐦𝐚 𝐝𝐢 𝐩𝐨𝐭𝐞𝐫 𝐫𝐞𝐜𝐥𝐚𝐦𝐚𝐫𝐞 𝐧𝐮𝐨𝐯𝐚𝐦𝐞𝐧𝐭𝐞.`, fkontak);
  }

  const moneyToAdd = 100;
  user.mattecash = (user.mattecash || 0) + moneyToAdd;
  user.lastclaim = currentTime;

  global.db.data.users[m.sender] = user; // Salva i dati aggiornati

  let text = `𝐇𝐚𝐢 𝐫𝐢𝐜𝐞𝐯𝐮𝐭𝐨 *${moneyToAdd}* MatteCash! 💸\n𝐈𝐧𝐭𝐞𝐫𝐯𝐚𝐥𝐥𝐨 𝐝𝐢 𝐫𝐢𝐜𝐡𝐢𝐞𝐬𝐭𝐚: 𝐨𝐠𝐧𝐢 𝐨𝐫𝐚.`;
  await conn.reply(m.chat, text, fkontak);
}

function msToTime(duration) {
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let seconds = Math.floor((duration / 1000) % 60);

  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return minutes + " 𝐦𝐢𝐧𝐮𝐭𝐢 " + seconds + " 𝐬𝐞𝐜𝐨𝐧𝐝𝐢";
}

handler.command = /^(paghetta)$/i;
handler.group = true;
export default handler;