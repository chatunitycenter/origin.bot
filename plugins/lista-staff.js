// Codice di STAFF_lista.js

import fs from 'fs'

function handler(m) {
  const ownerData = global.owner.find(([id, isCreator]) => id && isCreator)
  const contacts = [
    ownerData ? { number: ownerData[0], label: 'Owner' } : null,
    { number: '+639649477630@s.whatsapp.net', label: 'Co-Owner' },
    { number: '+447365589428@s.whatsapp.net', label: 'Co-Owner ²' },
    { number: '+393762030481@s.whatsapp.net', label: 'Developer' },
    { number: '+393276121255@s.whatsapp.net', label: 'Developer ²' },
    { number: '+39 351 841 9909@s.whatsapp.net', label: 'Developer ³' },
    { number: '+393201906964@s.whatsapp.net', label: 'Supporto Emotivo' },
    { number: '+393271710598@s.whatsapp.net', label: 'Numero Bot' }
  ].filter(x => x)

  const stylize = (text) => {
    const map = {
      A: '𝐀', B: '𝐁', C: '𝐂', D: '𝐃', E: '𝐄', F: '𝐅', G: '𝐆', H: '𝐇', I: '𝐈', J: '𝐉',
      K: '𝐊', L: '𝐋', M: '𝐌', N: '𝐍', O: '𝐎', P: '𝐏', Q: '𝐐', R: '𝐑', S: '𝐒', T: '𝐓',
      U: '𝐔', V: '𝐕', W: '𝐖', X: '𝐗', Y: '𝐘', Z: '𝐙',
      a: '𝐚', b: '𝐛', c: '𝐜', d: '𝐝', e: '𝐞', f: '𝐟', g: '𝐠', h: '𝐡', i: '𝐢', j: '𝐣',
      k: '𝐤', l: '𝐥', m: '𝐦', n: '𝐧', o: '𝐨', p: '𝐩', q: '𝐪', r: '𝐫', s: '𝐬', t: '𝐭',
      u: '𝐮', v: '𝐯', w: '𝐰', x: '𝐱', y: '𝐲', z: '𝐳',
      '¹': '¹', '²': '²', '³': '³', '⁴': '⁴', ' ': ' '
    }
    return [...text].map(c => map[c] || c).join('')
  }

  const contactList = contacts.map(contact => [
    contact.number,
    stylize(contact.label)
  ])

  const prova = {
    key: {
      participants: '0@s.whatsapp.net',
      fromMe: false,
      id: 'Halo'
    },
    message: {
      locationMessage: {
        name: 'Ꮻ𝐖𝐍𝚵𝐑 - 𝐒𝐭𝐚𝐟𝐟',
        jpegThumbnail: fs.readFileSync('./icone/bal.png'),
        vcard: contacts.map(contact => {
          const phone = contact.number.replace(/\D/g, '')
          const name = stylize(contact.label)
          return `BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
item1.TEL;waid=${phone}:${phone}
item1.X-ABLabel:Ponsel
END:VCARD`
        }).join('\n')
      }
    },
    participant: '0@s.whatsapp.net'
  }

  m.reply(`╭──〔 *𝐒𝐓𝐀𝐅𝐅 - 𝑶𝒓𝒊𝒈𝒊𝒏✦* 〕──◆
│
│  Ecco lo staff a tua disposizione!
│  Contattaci per qualsiasi esigenza.
│
╰────◆`, m.chat)

  this.sendContact(m.chat, contactList, prova)
}

handler.help = ['staff']
handler.tags = ['main']
handler.command = ['staff', 'owner']

export default handler