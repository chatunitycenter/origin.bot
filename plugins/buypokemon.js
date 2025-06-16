let handler = async (m, { conn, args }) => {
  const user = m.sender;
  const type = args[0]?.toLowerCase();
  const quantity = Math.max(1, parseInt(args[1]) || 1);

  const prices = {
    base: 100,
    imperium: 10000000,
    premium: 1000000000000
  };

  if (!['base', 'imperium', 'premium'].includes(type)) {
    return m.reply(`❌ Usa: .buy <base|imperium|premium> <quantità>\nEsempio: .buy base 3`);
  }

  global.db.data.users[user] = global.db.data.users[user] || {};
  const data = global.db.data.users[user];
  data.packInventory = data.packInventory || { base: 0, imperium: 0, premium: 0 };
  data.mattecash = data.mattecash || 0;

  const totalCost = prices[type] * quantity;

  if (data.mattecash < totalCost) {
    return m.reply(`❌ Ti servono *${totalCost}* Mattecash per acquistare ${quantity} pacchetti ${type.toUpperCase()}.\n💰 Bilancio attuale: ${data.mattecash}`);
  }

  data.mattecash -= totalCost;
  data.packInventory[type] += quantity;

  return m.reply(`✅ Hai comprato *${quantity}* pacchetti ${type.toUpperCase()}!\n📦 Totali ora: ${data.packInventory[type]}`);
};

handler.help = ['buy <tipo> <quantità>'];
handler.tags = ['pokemon'];
handler.command = /^buy$/i;

export default handler;