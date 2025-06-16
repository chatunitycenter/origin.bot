import fetch from 'node-fetch';

const API_KEY = '9746da2c-ac5f-487c-b4ae-fc55d1cd58b3'; // 🔐 Inserisci la tua chiave personale qui

const packPrices = {
  base: 100,
  imperium: 10000000,
  premium: 1000000000000
};

const rarities = {
  base: ['Common', 'Common', 'Uncommon'],
  imperium: ['Common', 'Uncommon', 'Rare'],
  premium: ['Rare', 'Rare', 'Rare Holo'],
  darkness: ['Misterioso']
};

const darknessPokemons = [
  { name: 'Edy', type: 'Buio', rarity: 'Misterioso', image: './icone/edy.png' },
  { name: 'Thoka', type: 'Buio', rarity: 'Misterioso', image: './icone/thoka.png' },
  { name: 'Matte', type: 'Buio', rarity: 'Misterioso', image: './icone/matte.png' },
  { name: 'Cecilia', type: 'Buio', rarity: 'Misterioso', image: './icone/cecilia.png' }
];

function convertRarityLabel(rarity) {
  switch (rarity) {
    case 'Common': return 'Comune';
    case 'Uncommon': return 'Non Comune';
    case 'Rare': return 'Raro';
    case 'Rare Holo': return 'Leggendario';
    case 'Misterioso': return 'Misterioso';
    default: return rarity;
  }
}

async function getRandomCardByRarity(rarity) {
  try {
    const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=rarity:"${encodeURIComponent(rarity)}"&pageSize=50`, {
      headers: { 'X-Api-Key': API_KEY }
    });

    if (!res.ok) throw new Error(`Errore API: ${res.status} ${res.statusText}`);

    const json = await res.json();
    const cards = json.data || [];
    if (cards.length === 0) return null;

    const card = cards[Math.floor(Math.random() * cards.length)];
    return {
      name: card.name,
      type: card.types?.join('/') || '???',
      rarity: convertRarityLabel(rarity),
      image: card.images?.large || card.images?.small || null,
      hp: card.hp || '???',
      subtype: card.subtypes?.join(', ') || null,
      shiny: Math.random() < 0.05,
      level: Math.floor(Math.random() * 100) + 1
    };
  } catch (err) {
    console.error(`Errore fetch API: ${err}`);
    return null;
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function mostraAnimazioneDarkness(conn, m, pokemon, user) {
  const animazione = [
    '🌑...',
    '🌑🌑...',
    '🌑🌑🌑 *???*',
    '🌑🌑🌑 *Una presenza oscura si manifesta...*',
    `✨🌑 *${pokemon.name.toUpperCase()}* appare dalle tenebre!`
  ];
  for (let frame of animazione) {
    await conn.sendMessage(m.chat, { text: frame, mentions: [user] }, { quoted: m });
    await delay(800);
  }
  await conn.sendMessage(m.chat, {
    image: { url: pokemon.image },
    caption: `🌑 *${pokemon.name}* (${pokemon.rarity})\n🔰 Tipo: ${pokemon.type} | Lvl: ${pokemon.level}${pokemon.shiny ? ' ✨ Shiny' : ''}`,
    mentions: [user]
  }, { quoted: m });
}

let handler = async (m, { conn, args }) => {
  const user = m.sender;
  global.db.data.users[user] = global.db.data.users[user] || {};
  const data = global.db.data.users[user];

  data.packInventory = data.packInventory || { base: 0, imperium: 0, premium: 0, darkness: 0 };
  data.pokemons = data.pokemons || [];

  const packType = args[0]?.toLowerCase();
  if (!['base', 'imperium', 'premium', 'darkness'].includes(packType)) {
    return m.reply(`❌ Specifica un tipo di pacchetto valido: *base*, *imperium*, *premium* o *darkness*.\n\nEsempio: *.apri base*`);
  }

  if ((data.packInventory[packType] || 0) <= 0) {
    return m.reply(`⛔ Non hai pacchetti *${packType.toUpperCase()}*. Usane o trovane uno.`);
  }

  // Scala pacchetto
  data.packInventory[packType]--;

  await conn.sendMessage(m.chat, { text: '🎁 Aprendo il pacchetto...', mentions: [user] }, { quoted: m });
  await delay(1200);
  await conn.sendMessage(m.chat, { text: '✨ Rivelando le carte...', mentions: [user] }, { quoted: m });
  await delay(1200);

  let cards = [];

  // Darkness ha carte predefinite
  if (packType === 'darkness') {
    for (let i = 0; i < 3; i++) {
      const card = JSON.parse(JSON.stringify(darknessPokemons[Math.floor(Math.random() * darknessPokemons.length)]));
      card.level = Math.floor(Math.random() * 100) + 1;
      card.shiny = Math.random() < 0.05;
      cards.push(card);
    }
  } else {
    const cardPromises = rarities[packType].map(r => getRandomCardByRarity(r));
    cards = (await Promise.all(cardPromises)).filter(Boolean);

    // Inizializza il contatore pity se non esiste
    data.pityCounter = data.pityCounter || 0;
    const chanceDarkness = Math.random() < 0.10;
    const pityTriggered = data.pityCounter >= 15;
    const foundDarkness = chanceDarkness || pityTriggered;

    if (foundDarkness) {
      const darkness = JSON.parse(JSON.stringify(darknessPokemons[Math.floor(Math.random() * darknessPokemons.length)]));
      darkness.level = Math.floor(Math.random() * 100) + 1;
      darkness.shiny = Math.random() < 0.05;
      cards.push(darkness);
      data.packInventory.darkness = (data.packInventory.darkness || 0) + 1;
      await mostraAnimazioneDarkness(conn, m, darkness, user);
      data.pokemons.push(darkness);
      data.pityCounter = 0;

      if (pityTriggered && !chanceDarkness) {
        await conn.sendMessage(m.chat, {
          text: `🕯️ *Il potere oscuro ti ha risposto dopo molta attesa...*\n🔄 Sistema _pity_ attivato dopo 15 pacchetti senza Darkness.`,
          mentions: [user]
        }, { quoted: m });
      }

      return;
    } else {
      data.pityCounter++;
    }

    // Bonus Leggendario
    if ((packType === 'imperium' || packType === 'premium') && Math.random() < 0.1) {
      const bonusCard = await getRandomCardByRarity('Rare Holo');
      if (bonusCard) cards.push(bonusCard);
    }
  }

  for (const card of cards) {
    data.pokemons.push({
      name: card.name,
      rarity: card.rarity,
      type: card.type,
      shiny: card.shiny,
      level: card.level
    });
  }

  if (cards.length === 0) return m.reply(`😢 Nessuna carta trovata. Riprova.`);

  const rarityRank = { 'Comune': 1, 'Non Comune': 2, 'Raro': 3, 'Leggendario': 4, 'Misterioso': 5 };
  const best = [...cards].sort((a, b) => (rarityRank[b.rarity] || 0) - (rarityRank[a.rarity] || 0))[0];

  const msg = `🎉 Hai aperto un pacchetto *${packType.toUpperCase()}* e trovato:\n\n` +
    `✨ *${best.name}* (${best.rarity})${best.shiny ? ' ✨ Shiny' : ''}\n` +
    `🔰 Tipo: ${best.type} | Lvl: ${best.level}\n\n` +
    `📦 Pacchetti rimasti: *${data.packInventory[packType]}* ${packType}`;

  const messageContent = {
    caption: msg,
    mentions: [user],
    buttons: [
      {
        buttonId: '.pity',
        buttonText: { displayText: '📊 Controlla Pity' },
        type: 1
      }
    ]
  };

  if (best.image) {
    await conn.sendMessage(m.chat, {
      image: { url: best.image },
      ...messageContent
    }, { quoted: m });
  } else {
    await conn.sendMessage(m.chat, {
      text: msg,
      ...messageContent
    }, { quoted: m });
  }
};

handler.help = ['apri <base|imperium|premium|darkness>'];
handler.tags = ['pokemon'];
handler.command = /^apri$/i;

export default handler;