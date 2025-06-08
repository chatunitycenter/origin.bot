









let games = {}; // Memorizza le stanze attive

export async function before(m) {
    const command = m.text.split(' ')[0].substring(1); // Comando
    const args = m.text.split(' ').slice(1); // Argomenti del comando
    const chatId = m.chat;

    if (command === 'kailand') {
        if (games[chatId]) {
            return m.reply('⚠️ Una partita è già in corso in questa stanza!');
        }
        if (args.length !== 2) {
            return m.reply('⚠️ Usa il comando così: .kailand emoji1 emoji2 (le emoji saranno le pedine dei giocatori).');
        }

        const [emoji1, emoji2] = args;
        if (emoji1 === emoji2) {
            return m.reply('⚠️ I giocatori devono scegliere pedine diverse!');
        }

        // Crea una nuova stanza di gioco
        games[chatId] = {
            players: [m.sender], // Primo giocatore
            emojis: [emoji1, emoji2],
            positions: [0, 0], // Posizioni iniziali
            turn: 0, // Turno iniziale
            maxPosition: 20, // Posizione di vittoria
        };

        m.reply(`🎲 *Partita creata!*\n\n👤 Giocatore 1: ${emoji1} (tu)\n💬 Aspettando il secondo giocatore...\nDigita .gioca ${emoji2} per unirti.`);
    }

    if (command === 'gioca') {
        if (!games[chatId]) {
            return m.reply('⚠️ Nessuna partita attiva in questa stanza! Usa .kailand per iniziare.');
        }

        const game = games[chatId];
        if (game.players.length >= 2) {
            return m.reply('⚠️ La stanza è piena!');
        }

        const emoji = args[0];
        if (game.emojis[1] !== emoji) {
            return m.reply(`⚠️ Devi usare lemoji corretta per unirti: ${game.emojis[1]}`);
        }

        game.players.push(m.sender);
        m.reply(`🎮 *Partita pronta!*\n\n👤 Giocatore 1: ${game.emojis[0]} (${game.players[0].split('@')[0]})\n👤 Giocatore 2: ${game.emojis[1]} (${game.players[1].split('@')[0]})\n\n🎲 Inizia ${game.emojis[0]}! Digita *dado* per tirare.`);
    }

    if (command === 'dado') {
        const game = games[chatId];
        if (!game) {
            return m.reply('⚠️ Nessuna partita attiva! Usa .kailand per iniziare.');
        }

        const currentPlayer = game.players[game.turn];
        if (m.sender !== currentPlayer) {
            return m.reply(`⏳ Non è il tuo turno! Tocca a ${game.emojis[game.turn]} (${game.players[game.turn].split('@')[0]}).`);
        }

        // Tira il dado
        const roll = Math.floor(Math.random() * 6) + 1;
        game.positions[game.turn] += roll;

        let response = `🎲 *Tiro di dado!* ${game.emojis[game.turn]} (${m.sender.split('@')[0]}) ha fatto *${roll}*\n`;
        if (game.positions[game.turn] >= game.maxPosition) {
            response += `🏆 *${game.emojis[game.turn]} (${m.sender.split('@')[0]}) ha vinto!*`;
            delete games[chatId]; // Termina la partita
        } else {
            response += `📍 Posizione: ${game.positions[game.turn]}/${game.maxPosition}\n\n🔄 Tocca a ${game.emojis[1 - game.turn]} (${game.players[1 - game.turn].split('@')[0]}).`;
            game.turn = 1 - game.turn; // Passa il turno
        }

        m.reply(response);
    }
}
