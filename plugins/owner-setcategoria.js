//crediti: Onix, di Riad
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!m.isGroup) return conn.sendMessage(m.chat, { text: "❌ Questo comando può essere usato solo nei gruppi." }, { quoted: m });

  // Ottenere informazioni sui partecipanti del gruppo
  const groupMetadata = await conn.groupMetadata(m.chat);
  const participants = groupMetadata.participants;

  // Ottenere l'utente menzionato o il risponditore
  let target = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : args[0]);

  if (!target) return conn.sendMessage(m.chat, { text: "𝐓𝐚𝐠 𝐦𝐚𝐧𝐜𝐚𝐧𝐭𝐞 !" }, { quoted: m });

  // Definire le categorie stilizzate
  const categorieStilizzate = {
    'vip': '𝐕𝐢𝐩 💎',
    'owner': '𝐎𝐰𝐧𝐞𝐫 𝐝𝐢 𝐎𝐫𝐢𝐠𝐢𝐧✦',
    'coowner': '𝐂𝐨-𝐎𝐰𝐧𝐞𝐫 𝐝𝐢 𝐎𝐫𝐢𝐠𝐢𝐧✦',
    'collaboratore': '𝐂𝐨𝐥𝐥𝐚𝐛𝐨𝐫𝐚𝐭𝐨𝐫𝐞 🤝🏼',
    'over40': '𝐎𝐯𝐞𝐫 40 🧓🏼',
    'troia': '𝐒𝐞𝐦𝐩𝐥𝐢𝐜𝐞𝐦𝐞𝐧𝐭𝐞 𝐓𝐑𝐎𝐈𝐀 🤢',
    'leggenda': '𝐋𝐞𝐠𝐠𝐞𝐧𝐝𝐚 𝐯𝐢𝐯𝐞𝐧𝐭𝐞 💯',
    'moderatore': '𝐌𝐨𝐝𝐞𝐫𝐚𝐭𝐨𝐫𝐞 🚨',
    'bot': '✦ 𝐁𝐨𝐭 ✦',
    'negra': '𝐍𝐞𝐠𝐫𝐚 👰🏿',
    'chad': '𝐆𝐢𝐠𝐚𝐜𝐡𝐚𝐝 🗿',
    'veterano': '𝐕𝐞𝐭𝐞𝐫𝐚𝐧𝐨 ⭐',
    'veterana': '𝐕𝐞𝐭𝐞𝐫𝐚𝐧𝐚 ⭐',
    'pickme': '𝐏𝐢𝐜𝐤-𝐦𝐞 𝐨𝐝𝐢𝐨𝐬𝐚 👠',
    '104': '𝐇𝐚𝐧𝐝𝐢𝐜𝐚𝐩𝐩𝐚𝐭𝐨 ♿',
    'cugino': '𝐂𝐮𝐠𝐢𝐧𝐨/𝐚 𝐝𝐢 𝐂𝐚𝐫𝐥𝐚 👩🏿‍🦱',
    'casoumano': '𝐂𝐚𝐬𝐨 𝐮𝐦𝐚𝐧𝐨 💩',
    'dormiglione': '𝐃𝐨𝐫𝐦𝐢𝐠𝐥𝐢𝐨𝐧𝐞 𝐢𝐧𝐚𝐭𝐭𝐢𝐯𝐨 😴',
    'mortodifiga': '𝐌𝐨𝐫𝐭𝐨 𝐝𝐢 𝐟𝐢𝐠𝐚 👽',
    'kebabbaro': '𝐊𝐞𝐛𝐚𝐛𝐛𝐚𝐫𝐨 𝐧𝐞𝐠𝐫𝐨 🥙',
    'negro': '𝐍𝐞𝐠𝐫𝐨 👨🏿',
    'bianco': '𝐁𝐢𝐚𝐧𝐜𝐨 👨🏻',
    'bianca': '𝐁𝐢𝐚𝐧𝐜𝐚 👰🏻‍♀️',
    'pizzaiolo': '𝐏𝐢𝐳𝐳𝐚𝐢𝐨𝐥𝐨 𝐛𝐢𝐚𝐧𝐜𝐨 🍕'
  };

  // Ottenere la categoria richiesta
  const categoria = args[1]?.toLowerCase();

  if (!categoria || !categorieStilizzate[categoria]) {
    return conn.sendMessage(m.chat, { text: "𝐂𝐚𝐭𝐞𝐠𝐨𝐫𝐢𝐚 𝐧𝐨𝐧 𝐯𝐚𝐥𝐢𝐝𝐚." }, { quoted: m });
  }

  // Recuperare i dati dell'utente dal database
  const user = global.db.data.users[target] || {};

  // Assegnare la categoria all'utente
  global.db.data.users[target] = { ...user, categoria: categorieStilizzate[categoria] };

  // Confermare l'assegnazione
  conn.sendMessage(m.chat, { 
    text: `𝐋𝐚 𝐜𝐚𝐭𝐞𝐠𝐨𝐫𝐢𝐚 𝐝𝐢 @${target.split('@')[0]} 𝐞̀ 𝐬𝐭𝐚𝐭𝐚 𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐭𝐚 𝐚: ${categorieStilizzate[categoria]}.`, 
    mentions: [target] 
  }, { quoted: m });
};

handler.command = /^(setcategoria)$/i;
handler.owner = true;
export default handler;
