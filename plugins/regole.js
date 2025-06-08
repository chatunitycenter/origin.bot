//Crediti: Onix, di Riad
let handler = async (m, { conn }) => {
    let groupMetadata = await conn.groupMetadata(m.chat);
    let groupName = groupMetadata.subject;
  let owner = groupMetadata.owner.split('@')[0];
    let groupDescription = groupMetadata.desc || '𝐃𝐞𝐬𝐜𝐫𝐢𝐳𝐢𝐨𝐧𝐞 𝐢𝐧𝐞𝐬𝐢𝐬𝐭𝐞𝐧𝐭𝐞 ⁉️';
let infoMessage = `
*𝐍𝐨𝐦𝐞 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐩𝐨:*
 ➪  ${groupName} \n
*𝐅𝐨𝐮𝐧𝐝𝐞𝐫 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐩𝐨*
 ➪  wa.me/${owner} \n
*𝐃𝐞𝐬𝐜𝐫𝐢𝐳𝐢𝐨𝐧𝐞 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐩𝐨:*
 ➪  ${groupDescription}
`;


    await conn.sendMessage(m.chat, { text: infoMessage }, { quoted: m });
};

handler.command = /^(rules|regole)$/i; 
handler.group = true; 
handler.admin = true;

export default handler;