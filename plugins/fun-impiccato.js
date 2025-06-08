let handler = async (m, { conn, command, args }) => {
  conn.impiccato = conn.impiccato || {};
  const roomId = m.chat;

  if (command === "impiccato") {
    if (conn.impiccato[roomId]) {
      return m.reply("⚠️ *Ehi campione!* C'è già una partita in corso in questo gruppo! 🧠💬\nScrivi una lettera con il comando *.lettera <tua_lettera>* per continuare a giocare!");
    }

    const parole = [
  "telefono", "tastiera", "scrivania", "zaino", "calcolatrice", "occhiali", "bottiglia", "ombrello",
  "specchio", "valigia", "cuscino", "asciugamano", "pennarello", "lampadina", "lavagna", "sedia", "coccodrillo", "leopardo", "scoiattolo", "pipistrello", "fenicottero", "canguro", "struzzo", "balena", "tartaruga", "ippopotamo", "cervo", "aquila", "cammello", "pinguino", "montagna", "deserto", "cascata", "vulcano", "laguna", "oceano", "savana", "grotta", "foresta", "isola", "prateria", "ghiacciaio", "palude", "villaggio", "castello", "cittadella", "cioccolato", "lasagna", "cappuccino", "biscotto", "spaghetti", "aranciata", "melanzana", "mortadella", "fragola", "pistacchio", "hamburger", "cannelloni", "tiramisù", "panettone", "libertà", "coraggio", "amicizia", "speranza", "tristezza", "allegria", "gelosia", "mistero", "giustizia", "saggezza", "passione", "timidezza", "ansia", "rabbia", "fantasia", "drago", "elfo", "spada", "magia", "castello", "pozzo", "mana", "pietra", "portale", "incantesimo", "goblin", "nave", "robot", "cyborg", "astronave", "universo", "galassia", "teletrasporto", "computer", "internet", "batteria", "satellite", "programma", "codice", "bit", "pixel", "drone", "server", "intelligenza", "algoritmo", "criptovaluta", "modem", "sensore", "neutrone", "notte", "luna", "stelle", "tramonto", "arcobaleno", "vento", "tempo", "destino", "ombra", "silenzio", "segreto", "viaggio", "treno", "giardino", "palazzo", "teatro", "scultura"
];

    const parola = parole[Math.floor(Math.random() * parole.length)];
    const nascosta = parola.replace(/./g, "⬜");

    conn.impiccato[roomId] = {
      parola,
      nascosta,
      errori: 0,
      tentativi: [],
    };

    return m.reply(
      `🎮 *Benvenuto nel gioco dell'Impiccato!* 🎲\n` +
      `Una nuova parola è stata scelta… riuscirai a salvarla dall'impiccagione? 😱\n\n` +
      `📌 Parola da indovinare: *${nascosta}*\n` +
      `🔤 Inizia a giocare scrivendo una lettera con il comando: *.lettera a*\n` +
      `❗ Hai massimo *6 errori* a disposizione… ogni errore ti avvicina al cappio! 🪢`
    );
  }

  if (command === "lettera") {
    if (!conn.impiccato[roomId]) {
      return m.reply("⚠️ Nessuna partita attiva! 💤\nDigita *.impiccato* per iniziare una nuova sfida!");
    }

    const room = conn.impiccato[roomId];
    const lettera = (args[0] || "").toLowerCase();

    if (!lettera.match(/^[a-z]$/)) {
      return m.reply("🚫 Comando non valido!\nScrivi una sola lettera. Esempio: *.lettera a*");
    }

    if (room.tentativi.includes(lettera)) {
      return m.reply(`⛔ La lettera *${lettera}* è già stata provata! Ritenta con un'altra! 🔁`);
    }

    room.tentativi.push(lettera);

    if (room.parola.includes(lettera)) {
      let nuova = "";
      for (let i = 0; i < room.parola.length; i++) {
        nuova += room.parola[i] === lettera ? lettera : room.nascosta[i];
      }
      room.nascosta = nuova;

      if (nuova === room.parola) {
        delete conn.impiccato[roomId];
        return m.reply(
          `🎉 *Complimenti, hai vinto!* 🏆\n` +
          `La parola misteriosa era: *${room.parola}*\n` +
          `Hai salvato la parola in tempo! 🔓`
        );
      } else {
        return m.reply(
          `✅ *Lettera corretta!* 🎯\n` +
          `🔠 Parola: *${room.nascosta}*\n` +
          `📌 Tentativi effettuati: [ ${room.tentativi.join(", ")} ]\n` +
          `❤️ Errori: ${room.errori}/6`
        );
      }
    } else {
      room.errori++;
      if (room.errori >= 6) {
        delete conn.impiccato[roomId];
        return m.reply(
          `💀 *Hai perso!* La parola era: *${room.parola}* 😢\n` +
          `Troppi errori… il tempo è scaduto. Riprova con più attenzione! ⏳`
        );
      } else {
        return m.reply(
          `❌ *Lettera sbagliata!* 😬\n` +
          `⚠️ Errori: ${room.errori}/6\n` +
          `🔠 Parola: *${room.nascosta}*\n` +
          `📌 Tentativi finora: [ ${room.tentativi.join(", ")} ]`
        );
      }
    }
  }

  if (command === "stopimpiccato") {
    if (!conn.impiccato[roomId]) {
      return m.reply("🛑 Non c'è nessuna partita attualmente in corso da terminare!");
    }
    delete conn.impiccato[roomId];
    return m.reply("🧹 *Partita interrotta con successo!* Tutto pulito, pronto per una nuova sfida. 💥");
  }
};

handler.help = ["impiccato", "lettera", "stopimpiccato"];
handler.tags = ["game"];
handler.command = /^impiccato|lettera|stopimpiccato$/i;

export default handler;