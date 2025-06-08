const singleExecution = function() {
    let executed = true;
    return function(context, func) {
        const wrapper = executed ? function() {
            if (func) {
                const result = func.apply(context, arguments);
                func = null;
                return result;
            }
        } : () => {};
        executed = false;
        return wrapper;
    };
}();

import fetch from "node-fetch";
import ytSearch from "yt-search";
import axios from "axios";


const audioFormats = ["mp3", "m4a", "webm", "acc", "flac", "opus", "ogg", "wav"];
const videoResolutions = ["360", "480", "720", "1080", "1440", "4k"];
const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148b Safari/604.1",
    "Mozilla/5.0 (iPad; CPU OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148b Safari/604.1",
    "Mozilla/5.0 (Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36",
    "Mozilla/5.0 (Android 13; Pixel 7 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 13.4; rv:109.0) Gecko/20100101 Firefox/114.0"
];
const getRandomUserAgent = () => userAgents[Math.floor(Math.random() * userAgents.length)];

const downloader = {
    async download(url, format) {
        if (!audioFormats.includes(format) && !videoResolutions.includes(format)) throw new Error("*𝐅𝐎𝐑𝐌𝐀𝐓𝐎 𝐍𝐎𝐍 𝐒𝐔𝐏𝐏𝐎𝐑𝐓𝐀𝐓𝐎*");
        try {
            const {
                data
            } = await axios.get(`https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`, {
                headers: {
                    "User-Agent": getRandomUserAgent()
                }
            });
            if (!data?.success) throw new Error("*𝐄𝐑𝐑𝐎𝐑𝐄 𝐃𝐔𝐑𝐀𝐍𝐓𝐄 𝐈𝐋 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐃𝐄𝐋 𝐕𝐈𝐃𝐄𝐎*");
            const downloadUrl = await downloader.checkProgress(data.id);
            return {
                id: data.id,
                image: data.info.image,
                title: data.title,
                downloadUrl
            };
        } catch (error) {
            throw error;
        }
    },
    async checkProgress(id) {
        try {
            while (true) {
                const {
                    data
                } = await axios.get(`https://p.oceansaver.in/ajax/progress.php?id=${id}`, {
                    headers: {
                        "User-Agent": getRandomUserAgent()
                    }
                });
                if (data?.success && data.progress === 1000) return data.download_url;
                await new Promise(resolve => setTimeout(resolve, 3000));
            }
        } catch (error) {
            throw error;
        }
    }
};

const handler = async (msg, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    if (!text?.trim()) return conn.reply(msg.chat, "*𝐈𝐍𝐒𝐄𝐑𝐈𝐒𝐂𝐈 𝐈𝐋 𝐍𝐎𝐌𝐄 𝐃𝐄𝐋𝐋𝐀 𝐌𝐔𝐒𝐈𝐂𝐀*", msg);
    try {
        const searchResults = await ytSearch(text);
        if (!searchResults?.all?.length) return msg.reply("*𝐍𝐄𝐒𝐒𝐔𝐍 𝐑𝐈𝐒𝐔𝐋𝐓𝐀𝐓𝐎 𝐓𝐑𝐎𝐕𝐀𝐓𝐎*");
        const {
            title,
            thumbnail,
            timestamp,
            views,
            ago,
            url,
            author
        } = searchResults.all[0];
        const formattedViews = new Intl.NumberFormat().format(views);
        const videoInfo = `*𝑻𝑰𝑻𝑶𝑳𝑶:* ${title}\n*𝑫𝑼𝑹𝑨𝑻𝑨:* ${timestamp}\n*𝑽𝑰𝑬𝑾𝑺:* ${formattedViews}\n*𝑪𝑨𝑵𝑨𝑳𝑬:* ${author?.name || "𝐒𝐂𝐎𝐍𝐎𝐒𝐂𝐈𝐔𝐓𝐎"}\n*𝑼𝑺𝑪𝑰𝑻𝑨:* ${ago}\n*𝑳𝑰𝑵𝑲:* ${url}\n> ⏳ 𝐈𝐥 𝐝𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐝𝐞𝐥𝐥𝐚 𝐭𝐫𝐚𝐜𝐜𝐢𝐚 𝐦𝐮𝐬𝐢𝐜𝐚𝐥𝐞 è 𝐢𝐧 𝐜𝐨𝐫𝐬𝐨...`;
        const thumbData = (await conn.getFile(thumbnail))?.data;
        conn.sendMessage(msg.chat, {
            text: videoInfo,
            contextInfo: {
                externalAdReply: {
                    title: "𝐎𝐑𝐈𝐆𝐈𝐍-𝐁𝐎𝐓✦ 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑",
                    body: "𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐅𝐀𝐂𝐈𝐋𝐄 & 𝐕𝐄𝐋𝐎𝐂𝐄 𝐃𝐈 𝐀𝐔𝐃𝐈𝐎/𝐕𝐈𝐃𝐄𝐎",
                    mediaType: 1,
                    previewType: 0,
                    mediaUrl: url,
                    sourceUrl: url,
                    thumbnail: thumbData
                }
            }
        });
        command = command.replace(usedPrefix, "");
        if (command === "play") {
            const {
                downloadUrl
            } = await downloader.download(url, "mp3");
            await conn.sendMessage(msg.chat, {
                audio: {
                    url: downloadUrl
                },
                mimetype: "audio/mpeg"
            }, {
                quoted: msg
            });
        } else if (["play2", "ytmp4"].includes(command)) {
            const {
                downloadUrl
            } = await downloader.download(url, "mp4");
            await conn.sendMessage(msg.chat, {
                video: {
                    url: downloadUrl
                },
                mimetype: "video/mp4",
                caption: "*𝐕𝐈𝐃𝐄𝐎 𝐒𝐂𝐀𝐑𝐈𝐂𝐀𝐓𝐎 𝐂𝐎𝐍 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐎*"
            }, {
                quoted: msg
            });
        } else throw "*𝐂𝐎𝐌𝐀𝐍𝐃𝐎 𝐍𝐎𝐍 𝐑𝐈𝐔𝐒𝐂𝐈𝐓𝐎*";
    } catch (error) {
        return msg.reply(`⚠︎ *𝐄𝐑𝐑𝐎𝐑𝐄:* ${error.message}`);
    }
};

handler.command = handler.help = ["play", "ytmp4", "play2"];
export default handler;