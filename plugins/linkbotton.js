const handler = async (m, {conn, args}) => {
const interactiveButtons = [
    {
        name: "cta_copy",
        buttonParamsJson: JSON.stringify({
             display_text: "Copia",
             id: 'https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat),
             copy_code: 'https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat)
        })
     },
     {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
             display_text: "Reimposta",
             id: `/reimpostagruppo ${m.chat}`,
        })
     }
]

const interactiveMessage = {
    text: "Ciao!",
    title: "Eccoti il link del gruppo:",
    footer: "this is the footer",
    interactiveButtons
}

await conn.sendMessage(m.chat, interactiveMessage, { quoted: m })
}
handler.help = ['linkgroup'];
handler.tags = ['group'];
handler.command = /^linkbotton(gro?up)?$/i;
handler.group = true;
handler.botAdmin = true;
export default handler;