import { createHash } from 'crypto';
import PhoneNumber from 'awesome-phonenumber';

const handler = async (m, { conn }) => {
  try {
    if (!m.isGroup) {
      return conn.sendMessage(m.chat, { text: "❌ Questo comando può essere usato solo nei gruppi." }, { quoted: m });
    }

    const mention = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : m.sender);
    const who = mention || m.sender;

    // Inizializza i dati dell'utente se non esistono
    if (!global.db.data.users[who]) {
      global.db.data.users[who] = { 
        money: 0, warn: 0, warnlink: 0, 
        muto: false, banned: false, 
        messaggi: 0, blasphemy: 0, 
        command: 0, vittorieSlot: 0, 
        categoria: null, instagram: null, 
        eta: null, genere: null
      };
    }

    const user = global.db.data.users[who];
    if (!user.pets) user.pets = [];

    // Lista gradi
    const gradi = [
      "𝐏𝐫𝐢𝐧𝐜𝐢𝐩𝐢𝐚𝐧𝐭𝐞 𝐈 😐", "𝐏𝐫𝐢𝐧𝐜𝐢𝐩𝐢𝐚𝐧𝐭𝐞 𝐈𝐈 😐",
      "𝐑𝐞𝐜𝐥𝐮𝐭𝐚 𝐈 🙂", "𝐑𝐞𝐜𝐥𝐮𝐭𝐚 𝐈𝐈 🙂",
      "𝐀𝐯𝐚𝐧𝐳𝐚𝐭𝐨 𝐈 🫡", "𝐀𝐯𝐚𝐧𝐳𝐚𝐭𝐨 𝐈𝐈 🫡",
      "𝐁𝐨𝐦𝐛𝐞𝐫 𝐈 😎", "𝐁𝐨𝐦𝐛𝐞𝐫 𝐈𝐈 😎",
      "𝐏𝐫𝐨 𝐈 😤", "𝐏𝐫𝐨 𝐈𝐈 😤",
      "𝐄́𝐥𝐢𝐭𝐞 𝐈 🤩", "𝐄́𝐥𝐢𝐭𝐞 𝐈𝐈 🤩",
      "𝐌𝐚𝐬𝐭𝐞𝐫 𝐈 💪🏼", "𝐌𝐚𝐬𝐭𝐞𝐫 𝐈𝐈 💪🏼",
      "𝐌𝐢𝐭𝐢𝐜𝐨 𝐈 🔥", "𝐌𝐢𝐭𝐢𝐜𝐨 𝐈𝐈 🔥",
      "𝐄𝐫𝐨𝐞 𝐈 🎖", "𝐄𝐫𝐨𝐞 𝐈𝐈 🎖",
      "𝐂𝐚𝐦𝐩𝐢𝐨𝐧𝐞 𝐈 🏆", "𝐂𝐚𝐦𝐩𝐢𝐨𝐧𝐞 𝐈𝐈 🏆",
      "𝐃𝐨𝐦𝐢𝐧𝐚𝐭𝐨𝐫𝐞 𝐈 🥶", "𝐃𝐨𝐦𝐢𝐧𝐚𝐭𝐨𝐫𝐞 𝐈𝐈 🥶",
      "𝐒𝐭𝐞𝐥𝐥𝐚𝐫𝐞 𝐈 💫", "𝐒𝐭𝐞𝐥𝐥𝐚𝐫𝐞 𝐈𝐈 💫",
      "𝐂𝐨𝐬𝐦𝐢𝐜𝐨 𝐈 🔮", "𝐂𝐨𝐬𝐦𝐢𝐜𝐨 𝐈𝐈 🔮",
      "𝐓𝐢𝐭𝐚𝐧𝐨 𝐈 😈", "𝐓𝐢𝐭𝐚𝐧𝐨 𝐈𝐈 😈",
      "𝐋𝐞𝐠𝐠𝐞𝐧𝐝𝐚 𝐈 ⭐️", "𝐋𝐞𝐠𝐠𝐞𝐧𝐝𝐚 𝐈𝐈 ⭐️",
    ];

    const livello = Math.floor(user.messaggi / 1000);
    const grado = livello >= 30 ? "𝐎𝐬𝐬𝐞𝐬𝐬𝐢𝐨𝐧𝐚𝐭𝐨 ❤️‍🔥" : (gradi[livello] || "-");

    const groupMetadata = await conn.groupMetadata(m.chat);
    const participants = groupMetadata.participants;
    const groupOwner = groupMetadata.owner;

    const participant = participants.find(p => p.id === who);
    const isAdmin = participant && (participant.admin === 'admin' || participant.admin === 'superadmin');
    const isFounder = who === groupOwner;

    const ruolo = isFounder ? '𝐅𝐨𝐮𝐧𝐝𝐞𝐫 ⚜️' : isAdmin ? '𝐀𝐝𝐦𝐢𝐧 👑' : '𝐌𝐞𝐦𝐛𝐫𝐨 🤍';
    const emojiGenere = user.genere === "maschio" ? "🚹" : user.genere === "femmina" ? "🚺" : "𝐍𝐨𝐧 𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐭𝐨";

    let pic, status;
    try {
      pic = await conn.profilePictureUrl(who, 'image');
    } catch (e) {
      pic = 'https://qu.ax/LoGxD.png';
    }

    try {
      const statusInfo = await conn.fetchStatus(who);
      status = statusInfo.status || "𝐍𝐨𝐧 𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐭𝐨";
    } catch (e) {
      status = "𝐍𝐨𝐧 𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐭𝐨";
    }

    conn.sendMessage(m.chat, {
      text: `꧁════ ☾︎•✦•☽︎ ════꧂\n` +
        `𝕄𝕖𝕤𝕤𝕒𝕘𝕘𝕚: ${user.messaggi || 0}\n` +
        `𝕎𝕒𝕣𝕟: ${user.warn || 0} / 4\n` +
        `ℝ𝕦𝕠𝕝𝕠: ${ruolo}\n` + 
        `ℂ𝕒𝕥𝕖𝕘𝕠𝕣𝕚𝕒: ${user.categoria || '𝐍𝐞𝐬𝐬𝐮𝐧𝐚'}\n` +  
        `𝔾𝕣𝕒𝕕𝕠: ${grado}\n` +  
        `𝔼𝕥𝕒̀: ${user.eta ? user.eta + " 𝐚𝐧𝐧𝐢" : "𝐍𝐨𝐧 𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐭𝐚"}\n` +  
        `𝔾𝕖𝕟𝕖𝕣𝕖: ${emojiGenere}\n` +
        `𝔹𝕚𝕠: ${status}\n` +
        `${user.muto ? `𝐮𝐭𝐞𝐧𝐭𝐞 𝐦𝐮𝐭𝐚𝐭𝐨 🔇\n` : ''}` +
        `${user.banned ? `𝐜𝐨𝐦𝐚𝐧𝐝𝐢 𝐛𝐥𝐨𝐜𝐜𝐚𝐭𝐢 ⛔\n` : ''}` +
        `𝕍𝕚𝕥𝕥𝕠𝕣𝕚𝕖 𝕕𝕖𝕝𝕝𝕒 𝕤𝕝𝕠𝕥: ${user.vittorie || 0}\n` +  
        `ℙ𝕖𝕥: ${user.pets.length > 0 ? user.pets.join(", ") : '𝐍𝐞𝐬𝐬𝐮𝐧𝐨'}\n` +
        `${user.instagram ? `instagram.com/${user.instagram}` : '𝕀𝕟𝕤𝕥𝕒𝕘𝕣𝕒𝕞: 𝐧𝐨𝐧 𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐭𝐨'}\n` +
        `꧁════ ☾︎•✦•☽︎ ════꧂`,
      contextInfo: {
        mentionedJid: [who],
        externalAdReply: {
          title: `${user.name || 'Sconosciuto'}`,
          body: `𝑼𝒕𝒆𝒏𝒕𝒆 𝒅𝒊 𝑶𝒓𝒊𝒈𝒊𝒏`,
          sourceUrl: "https://wa.me/" + who.split("@")[0],
          thumbnail: await (await fetch(pic)).buffer(),
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error(error);
  }
};

handler.command = /^(info)$/i;
export default handler;
