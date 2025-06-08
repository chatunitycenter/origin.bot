import axios from 'axios';

export default {
  type: 'convert',
  command: ['pinterest', 'pint'],
  operate: async (context) => {
    const { q: text, tdx, m, prefix, command, xreply, reaction, sleep, crtImg } = context;

    if (!text) {
      await xreply(`Aggiungi input, esempio: *${prefix + command} natura*`);
      await reaction(m.chat, "❗");
      return;
    }

    try {
      await reaction(m.chat, "🔁");
      await sleep(500);

      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }

      const url = `https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(text)}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${encodeURIComponent(text)}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D`;

      const { data } = await axios.get(url);
      const results = data?.resource_response?.data?.results || [];

      const images = results.map(v => v?.images?.orig?.url).filter(Boolean);
      shuffleArray(images);

      const selected = images.slice(0, 5);
      const push = [];

      for (let i = 0; i < selected.length; i++) {
        const img = selected[i];
        const imageMessage = await crtImg(img);

        push.push({
          body: {
            text: `_*Ecco il risultato di: ${text}*_`
          },
          footer: {
            text: '© ᴼʳⁱᵍⁱⁿ ᴮᵒᵗ✦ - #TrashDex'
          },
          header: {
            title: `Image - ${i + 1}`,
            hasMediaAttachment: true,
            imageMessage: imageMessage
          },
          nativeFlowMessage: {
            buttons: [
              {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                  display_text: "Source",
                  url: `https://www.pinterest.com/search/pins/?rs=typed&q=${encodeURIComponent(text)}`,
                  merchant_url: `https://www.pinterest.com/search/pins/?rs=typed&q=${encodeURIComponent(text)}`
                })
              }
            ]
          }
        });
      }

      await tdx.relayMessage(m.chat, {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              body: {
                text: '*Ecco i risultati di Pinterest:*'
              },
              footer: {
                text: '© ᴼʳⁱᵍⁱⁿ ᴮᵒᵗ✦ - #Last Version'
              },
              header: {
                hasMediaAttachment: false
              },
              carouselMessage: {
                cards: push
              }
            }
          }
        }
      }, {});

      await reaction(m.chat, "✅");
    } catch (error) {
      console.error('Pinterest error:', error);
      await xreply('Errore nel recupero delle immagini. Pinterest potrebbe aver bloccato la richiesta.');
      await reaction(m.chat, "❌");
    }
  }
};