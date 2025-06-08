/*====================================================================================
   Script: Verifica Numeri WhatsApp
   Autore: https://github.com/ALBERTO9883
   Descrizione: Controlla l'esistenza di numeri su WhatsApp generando combinazioni.
====================================================================================*/

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const regex = /x/g;

  // Validazione input
  if (!text) {
    throw `⚠️ Errore: Numero mancante.\nEsempio: ${usedPrefix + command} 39333333333x`;
  }
  if (!text.match(regex)) {
    throw `⚠️ Formato non valido.\nUsa: ${usedPrefix + command} 39333333333x`;
  }

  const wildcardCount = text.match(regex).length; // Conta il numero di "x"
  const totalCombinations = Math.pow(10, wildcardCount); // Calcola combinazioni totali
  const results = [];

  // Generazione e verifica combinazioni
  for (let i = 0; i < totalCombinations; i++) {
    // Genera il numero sostituendo le 'x' con i valori da 0 a 9
    const paddedNumber = i.toString().padStart(wildcardCount, '0');
    const paddedNumberArray = paddedNumber.split(''); // Divide in array per usare shift
    const generatedNumber = text.replace(regex, () => paddedNumberArray.shift()) + '@s.whatsapp.net';

    // Verifica se il numero esiste su WhatsApp
    if (await conn.onWhatsApp(generatedNumber).then(v => (v[0] || {}).exists)) {
      const info = await conn.fetchStatus(generatedNumber).catch(_ => {});
      results.push({ exists: true, jid: generatedNumber, ...info });
    } else {
      results.push({ exists: false, jid: generatedNumber });
    }
  }

  // Formattazione risultati
  const registeredNumbers = results
    .filter(v => v.exists)
    .map(v => 
      `Numero: wa.me/${v.jid.split('@')[0]}\n` +
      `Stato: ${v.status || 'Nessuna descrizione'}\n` +
      `Data aggiornamento: ${formatDate(v.setAt)}`
    )
    .join('\n\n');

  const unregisteredNumbers = results
    .filter(v => !v.exists)
    .map(v => v.jid.split('@')[0])
    .join('\n');

  const response = 
    `--- RISULTATO DELLA VERIFICA ---\n\n` +
    `*Numeri Registrati:*\n${registeredNumbers || '*Nessuno trovato.*'}\n\n` +
    `*Numeri Non Registrati:*\n${unregisteredNumbers || '*Nessuno.*'}\n\n` +
    `---------------------------------`;

  m.reply(response);
};

handler.command = /^verifica$/i;
export default handler;

// Funzione per formattare la data
function formatDate(n, locale = 'id') {
  let d = new Date(n);
  return d.toLocaleDateString(locale, { timeZone: 'Asia/Jakarta' });
}