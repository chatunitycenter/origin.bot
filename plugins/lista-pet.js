const handler = async (m, { conn }) => {
  const pets = {
    comuni: {
      Gatto: 1000,
      Cane: 2000,
      Volpe: 3500,
      Panda: 4000
    },
    rari: {
      Drago: 5000,
      Lupo: 6000,
      Tigre: 8000,
      Leone: 9000,
      Fenice: 12000,
      Unicorno: 15000
    },
    leggendari: {
      Nico: 30000,
      Carla: 30000,
      "Mini P.E.K.K.A": 30000
    }
  };

  let msg = '╭─〔 𝕃𝕚𝕤𝕥𝕒 ℙ𝕖𝕥 𝔻𝕚𝕤𝕡𝕠𝕟𝕚𝕓𝕚𝕝𝕚 〕─╮\n\n';

  msg += '*✦ Comuni ✦*\n';
  for (const [nome, prezzo] of Object.entries(pets.comuni)) {
    msg += `• ${nome} ➪ ${prezzo} messaggi\n`;
  }

  msg += '\n*✦ Rari ✦*\n';
  for (const [nome, prezzo] of Object.entries(pets.rari)) {
    msg += `• ${nome} ➪ ${prezzo} messaggi\n`;
  }

  msg += '\n*✦ Leggendari ✦*\n';
  for (const [nome, prezzo] of Object.entries(pets.leggendari)) {
    msg += `• ${nome} ➪ ${prezzo} messaggi\n`;
  }

  msg += '\n> usa .pet/.comprapet <nome_animale>';

  await conn.sendMessage(m.chat, { text: msg }, { quoted: m });
};

handler.command = /^listapet$/i;
export default handler;
