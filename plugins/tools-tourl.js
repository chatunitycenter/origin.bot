const axios = require('axios');
const FormData = require('form-data');
const dns = require('dns').promises;

async function checkDomain(domain) {
  try {
    await dns.lookup(domain);
    console.log(`Dominio "${domain}" raggiungibile.`);
    return true;
  } catch {
    console.error(`Dominio "${domain}" non raggiungibile.`);
    return false;
  }
}

async function uploadToAnonfiles(filePath) {
  const domain = 'api.anonfiles.com';
  const url = `https://${domain}/upload`;

  // Controlla se il dominio è raggiungibile
  const isDomainReachable = await checkDomain(domain);
  if (!isDomainReachable) {
    console.error(`Impossibile connettersi al dominio "${domain}".`);
    return;
  }

  try {
    // Prepara i dati del file
    const fs = require('fs');
    const file = fs.createReadStream(filePath);
    const formData = new FormData();
    formData.append('file', file);

    // Effettua la richiesta POST
    const response = await axios.post(url, formData, {
      headers: formData.getHeaders(),
      timeout: 10000, // Timeout di 10 secondi
    });

    console.log('Upload completato con successo:', response.data);
  } catch (error) {
    if (error.code === 'ENOTFOUND') {
      console.error('Errore: dominio non trovato.');
    } else if (error.code === 'ECONNABORTED') {
      console.error('Errore: timeout scaduto durante la connessione.');
    } else {
      console.error('Errore durante l\'upload:', error.message);
    }
  }
}

// Esempio di utilizzo
const filePath = './file_da_caricare.txt'; // Sostituisci con il percorso del file
uploadToAnonfiles(filePath);
