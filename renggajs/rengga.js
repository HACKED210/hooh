require('../renggaqr/renggasettings')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@adiwajshing/baileys");
const fs = require("fs");
const chalk = require("chalk");
const crypto = require("crypto");
const { exec, spawn, execSync } = require("child_process");
const axios = require("axios");
const fetch = require("node-fetch");
const Jimp = require("jimp");
const util = require("util");
const { sizeFormatter} = require("human-readable")
const format = sizeFormatter()
const cheerio = require('cheerio')
const yts = require('yt-search')
const ytdl = require('ytdl-core')
const moment = require('moment-timezone')
const hariini = moment.tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')
const hariiini = moment.tz('Asia/Jakarta').format('DD MMMM YYYY')
const { color, bgcolor, mycolor } = require('./lib/color')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, parseMention, getRandom } = require('./lib/functions')
const addusrp = JSON.parse(fs.readFileSync('./renggajs/database/user.json'))

module.exports = rengga = async (rengga, m, chatUpdate, store) => {
try {
const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
const budy = (typeof m.text == 'string' ? m.text : '')
const prefix = /^[°#*+,.?=''():√%!¢£¥€π¤ΠΦ_&`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°#*+,.?=''():√%¢£¥€π¤ΠΦ_&!`™©®Δ^βα¦|/\\©^]/gi) : '.'
const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
const content = JSON.stringify(m.message)
const { type, quotedMsg, mentioned, now, fromMe } = m
const isCmd = body.startsWith(prefix)
const from = m.key.remoteJid
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const pushname = m.pushName || "No Name"
const botNumber = await rengga.decodeJid(rengga.user.id)
const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const itsMe = m.sender == botNumber ? true : false
const text = q = args.join(" ")
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const isMedia = /image|video|sticker|audio/.test(mime)
const { chats } = m

const tanggal = moment.tz('Asia/Jakarta').format('DD/MM/YY')

const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
const groupMetadata = m.isGroup ? await rengga.groupMetadata(m.chat).catch(e => {}) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
const groupOwner = m.isGroup ? groupMetadata.owner : ''
const groupMembers = m.isGroup ? groupMetadata.participants : ''
	const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
	const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
	
if (!rengga.public) {
if (!m.key.fromMe) return
}

if (isCmd && m.isGroup) { console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Group Chat"), chalk.bold('[' + args.length + ']')); }
if (isCmd && !m.isGroup) { console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Private Chat"), chalk.bold('[' + args.length + ']')); }
		
try {
ppuser = await rengga.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
ppnyauser = await getBuffer(ppuser)

const generateProfilePicture = async(buffer) => {
const jimp_1 = await Jimp.read(buffer);
const resz = jimp_1.getWidth() > jimp_1.getHeight() ? jimp_1.resize(550, Jimp.AUTO) : jimp_1.resize(Jimp.AUTO, 650)
const jimp_2 = await Jimp.read(await resz.getBufferAsync(Jimp.MIME_JPEG));
return {
img: await resz.getBufferAsync(Jimp.MIME_JPEG)
}
}
//━━━━━━━━━━━━━━━[ FAKE FAKE ]━━━━━━━━━━━━━━━━━//
const fkontak = { key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': 'renggaDev', 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;renggaDev;;;\nFN:renggaev\nitem1.TEL;waid=6285730734652:6285730734652\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': thumb, thumbnail: thumb,sendEphemeral: true}}}
const reply = (teks) => {
rengga.sendMessage(m.chat, { text: teks ,
contextInfo:{
forwardingScore: 9999999, 
isForwarded: true
}
}, { quoted : repPy })
}
//HAYO MAU NGAPAIN//
const repPy = {
	key: {
		remoteJid: '0@s.whatsapp.net',
		fromMe: false,
		id: `${global.namabot}`,
		participant: '0@s.whatsapp.net'
	},
	message: {
		requestPaymentMessage: {
			currencyCodeIso4217: "USD",
			amount1000: 999999999,
			requestFrom: '0@s.whatsapp.net',
			noteMessage: {
				extendedTextMessage: {
					text: `${global.namabot}`
				}
			},
			expiryTimestamp: 999999999,
			amount: {
				value: 91929291929,
				offset: 1000,
				currencyCode: "USD"
			}
		}
	}
}
//━━━━━━━━━━━━━━━[ DIWNLOAD YTMP3 ]━━━━━━━━━━━━━━━━━//
const downloadMp4 = async (Link) => {
try {
await ytdl.getInfo(Link)
let mp4File = getRandom('.mp4')
console.log(color('Download Video With ytdl-core'))
let nana = ytdl(Link)
.pipe(fs.createWriteStream(mp4File))
.on('finish', async () => {
await rengga.sendMessage(m.chat, { video: fs.readFileSync(mp4File), caption: mess.succes, gifPlayback: false }, { quoted: m })
fs.unlinkSync(`./${mp4File}`)
})
} catch (err) {
m.reply(`${err}`)
}
}

const downloadMp3 = async (Link) => {
try {
await ytdl.getInfo(Link)
let mp3File = getRandom('.mp3')
console.log(color('Download Audio With ytdl-core'))
ytdl(Link, { filter: 'audioonly' })
.pipe(fs.createWriteStream(mp3File))
.on('finish', async () => {
await rengga.sendMessage(m.chat, { audio: fs.readFileSync(mp3File), mimetype: 'audio/mp4' }, { quoted: m })
fs.unlinkSync(mp3File)
})
} catch (err) {
m.reply(`${err}`)
}
}
async function sendrenggaMessage(chatId, message, options = {}){
    let generate = await generateWAMessage(chatId, message, options)
    let type2 = getContentType(generate.message)
    if ('contextInfo' in options) generate.message[type2].contextInfo = options?.contextInfo
    if ('contextInfo' in message) generate.message[type2].contextInfo = message?.contextInfo
    return await rengga.relayMessage(chatId, generate.message, { messageId: generate.key.id })
}
//━━━━━━━━━━━━━━━[ BATAS FAKE ]━━━━━━━━━━━━━━━━━//
const createSerial = (size) => {
return crypto.randomBytes(size).toString('hex').slice(0, size)
}

function randomNomor(min, max = null) {
if (max !== null) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min;
} else {
return Math.floor(Math.random() * min) + 1
}
}
function monospace(string) {
return '```' + string + '```'
}

const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
}

global.addUserPanel = (email, username, expired, _db) => {
var obj_add = {
email: email,
username: username,
expired: expired
}
_db.push(obj_add)
fs.writeFileSync('./renggajs/database/user.json', JSON.stringify(_db, null, 3))
}

switch (command) {
//━━━━━━━━━━━━━━━[ MENU ]━━━━━━━━━━━━━━━━━//
case 'menu': {
let menu = `
-.bayar
-.buypanel
-.ownermenu
-.play
-.igku`
m.reply(`HI ${pushname} DAN SEMUANYA 😁👋\n\n` + menu + `\n\n${runtime(process.uptime())}`)
}
break
case 'bayar': {
rengga.sendMessage(m.chat, { image: { url: 'https://telegra.ph/QRIS-ALL-PAY-01-29' }, caption: `Hi Kak\nUNTUK PEMBAYARAN DI RENGGA XD\nSilahkan Cek Di Atas => Tinggal Scan Aja.` }, { quoted: m })
}
break
case 'igku': {
reply(`https://instagram.com/rengganofake`)
}
break
//BUY PANEL => renggaDev
case "buypanel": case "buypannel":
const dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
if (args[0] == "1gb") {
await rengga.sendMessage(m.chat, { text: `Pesanan Anda Telah Terkirim Ke Owner Bot Tunggu 1-10 menit Nanti Juga Ada Yang Chat.` }, { quoted: fkontak })
await rengga.sendMessage(creAtor,{text:`*❏ ORDER PANEL ❏*
*PAKET :* 5.000 
*RAM :* 1GB 
*CPU :* 35%
*TANGGAL:* ${hariiini}
- @${sender.split("@")[0]}`,mentions: [sender], },{quoted:m})
} if (args[0] == "2gb") {
await rengga.sendMessage(m.chat, { text: `Pesanan Anda Telah Terkirim Ke Owner Bot Tunggu 1-10 menit Nanti Juga Ada Yang Chat.` }, { quoted: fkontak })
await rengga.sendMessage(creAtor,{text:`*❏ ORDER PANEL ❏*
*PAKET :* 10.000 
*RAM :* 2GB 
*CPU :* 60%
*TANGGAL:* ${hariiini}
- @${sender.split("@")[0]}`,mentions: [sender], },{quoted:m})
} if (args[0] == "3gb") {
await rengga.sendMessage(m.chat, { text: `Pesanan Anda Telah Terkirim Ke Owner Bot Tunggu 1-10 menit Nanti Juga Ada Yang Chat.` }, { quoted: fkontak })
await rengga.sendMessage(creAtor,{text:`*❏ ORDER PANEL ❏*
*PAKET :* 15.000 
*RAM :* 3GB 
*CPU :* 85%
*TANGGAL:* ${hariiini}
- @${sender.split("@")[0]}`,mentions: [sender], },{quoted:m})
} if (args[0] == "4gb") {
await rengga.sendMessage(m.chat, { text: `Pesanan Anda Telah Terkirim Ke Owner Bot Tunggu 1-10 menit Nanti Juga Ada Yang Chat.` }, { quoted: fkontak })
await rengga.sendMessage(creAtor,{text:`*❏ ORDER PANEL ❏*
*PAKET :* 20.000 
*RAM :* 4GB 
*CPU :* 115%
*TANGGAL:* ${hariiini}
- @${sender.split("@")[0]}`,mentions: [sender], },{quoted:m})
} if (args[0] == "5gb") {
await rengga.sendMessage(m.chat, { text: `Pesanan Anda Telah Terkirim Ke Owner Bot Tunggu 1-10 menit Nanti Juga Ada Yang Chat.` }, { quoted: fkontak })
await rengga.sendMessage(creAtor,{text:`*❏ ORDER PANEL ❏*
*PAKET :* 25.000 
*RAM :* 5GB 
*CPU :* 140%
*TANGGAL:* ${hariiini}
- @${sender.split("@")[0]}`,mentions: [sender], },{quoted:m})
} if (args[0] == "6gb") {
await rengga.sendMessage(m.chat, { text: `Pesanan Anda Telah Terkirim Ke Owner Bot Tunggu 1-10 menit Nanti Juga Ada Yang Chat.` }, { quoted: fkontak })
await rengga.sendMessage(creAtor,{text:`*❏ ORDER PANEL ❏*
*PAKET :* 30.000 
*RAM :* 6GB 
*CPU :* 165%
*TANGGAL:* ${hariiini}
- @${sender.split("@")[0]}`,mentions: [sender], },{quoted:m})
} if (args[0] == "7gb") {
await rengga.sendMessage(m.chat, { text: `Pesanan Anda Telah Terkirim Ke Owner Bot Tunggu 1-10 menit Nanti Juga Ada Yang Chat.` }, { quoted: fkontak })
await rengga.sendMessage(creAtor,{text:`*❏ ORDER PANEL ❏*
*PAKET :* 35.000 
*RAM :* 7GB 
*CPU :* 180%
*TANGGAL:* ${hariiini}
- @${sender.split("@")[0]}`,mentions: [sender], },{quoted:m})
} if (args[0] == "8gb") {
await rengga.sendMessage(m.chat, { text: `Pesanan Anda Telah Terkirim Ke Owner Bot Tunggu 1-10 menit Nanti Juga Ada Yang Chat.` }, { quoted: fkontak })
await rengga.sendMessage(creAtor,{text:`*❏ ORDER PANEL ❏*
*PAKET :* 40.000 
*RAM :* 8GB 
*CPU :* 200%
*TANGGAL:* ${hariiini}
- @${sender.split("@")[0]}`,mentions: [sender], },{quoted:m})
} if (args[0] == "unli") {
await rengga.sendMessage(m.chat, { text: `Pesanan Anda Telah Terkirim Ke Owner Bot Tunggu 1-10 menit Nanti Juga Ada Yang Chat.` }, { quoted: fkontak })
await rengga.sendMessage(creAtor,{text:`*❏ ORDER PANEL ❏*
*PAKET :* 45.000 
*RAM :* UNLIMITED 
*CPU :* UNLIMITED%
*TANGGAL:* ${hariiini}
- @${sender.split("@")[0]}`,mentions: [sender], },{quoted:m})
} else {
const seactiones = [
{
title: `RAM 1 GB • CPU 35%`,
rows: [
{title: `Rp. 5.000 / Bulan`, rowId: `${prefix + command} 1gb`},
]
},
{
title: `RAM 2 GB •  CPU 60%`,
rows: [
{title: `Rp. 10.000 / Bulan`, rowId: `${prefix + command} 2gb`},
]
},
{
title: `RAM 3 GB • CPU 85%`,
rows: [
{title: `Rp. 15.000 / Bulan`, rowId: `${prefix + command} 3gb`},
]
},
{
title: `RAM 4 GB • CPU 100%`,
rows: [
{title: `Rp. 20.000 / Bulan`, rowId: `${prefix + command} 4gb`},
]
},
{
title: `RAM 5 GB • CPU 135%`,
rows: [
{title: `Rp. 25.000 / Bulan`, rowId: `${prefix + command} 5gb`},
]
},
{
title: `RAM 6 GB • CPU 150%`,
rows: [
{title: `Rp. 30.000 / Bulan`, rowId: `${prefix + command} 6gb`},
]
},
{
title: `RAM 7 GB • CPU 180%`,
rows: [
{title: `Rp. 35.000 / Bulan`, rowId: `${prefix + command} 7gb`},
]
},
{
title: `RAM 8 GB • CPU 200%`,
rows: [
{title: `Rp. 40.000 / Bulan`, rowId: `${prefix + command} 8gb`},
]
},
{
title: `RAM UNLIMITED GB • CPU UNLIMITED%`,
rows: [
{title: `Rp. 45.000 / Bulan`, rowId: `${prefix + command} unli`},
]
}
]
const listSw = { 
text: `Hai Kak @${sender.split("@")[0]}`,
mentions: [sender],
footer: `Mau Beli Panel ? Silahkan Pencet Di Bawah Ya Kak Untuk Melihat Harga Panel.`,
buttonText: 'LIST PANEL',
sections: seactiones,
listType: 1}
rengga.sendMessage(m.chat, listSw, { quoted: repPy })
}
break
case "ownermenu": case "ownmenu":{
let listnya = `
-.form
-.listusr
-.addusr
-.delusr
-.detusr
-.listsrv
-.addsrv
-.delsrv
-.detsrv
`
m.reply(`MENU KHUSUS RENGGAXD😁👋\n\n` + listnya + `\n\n${runtime(process.uptime())}`)
}
break
case 'hidetag': {
if (!m.isGroup) throw mess.group
if (!isBotAdmins) throw mess.botAdmin
if (!isAdmins) throw mess.admin
rengga.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: m })
            }
            break
case "listusr": {
if (!isCreator) return m.reply(`Lu Siapa Ngentot?Ini Cuman Khusus RENGGAXD🔥️`)
let page = args[0] ? args[0] : '1'
let f = await fetch(domain + "/api/application/users?page=" + page, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = await f.json();
let users = res.data
let sections = []
for (let user of users) {
let u = user.attributes
let obj = {
title: "-- PANEL",
rows: [
{ title: `${u.id}. ${u.username}`, rowId: `${prefix}detusr ` + u.id, description: u.first_name + ' ' + u.last_name },
]
}
await sections.push(obj)
if (sections.length === 50) {
sections.push({
title: "-- PANEL",
rows: [
{ title: `⏩ NEXT`, rowId: `${prefix}listusr 2`, description: 'Page 2' },
{ title: `⏩ NEXT`, rowId: `${prefix}listusr 3`, description: 'Page 3' },
{ title: `⏩ NEXT`, rowId: `${prefix}listusr 4`, description: 'Page 4' },
{ title: `⏩ NEXT`, rowId: `${prefix}listusr 5`, description: 'Page 5' },
]
})
}
}
await rengga.sendMessage(m.chat, {
text: "Berikut list user *PANEL*",
footer: `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}`,
title: "*PANEL*",
buttonText: `${res.meta.pagination.count} Users`,
sections
},{ quoted : m })
}
break
case "addusr": {

if (!isCreator) return m.reply(`Lu Siapa Ngentot?Ini Cuman Khusus RENGGAXD🔥️`)
let t = text.split(',');
if (t.length < 3) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} email,username,name,number/tag`);
let email = t[0];
let username = t[1];
let name = t[2];
let u = m.quoted ? m.quoted.sender : t[3] ? t[3].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
if (!u) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} email,username,name,number/tag`);
let d = (await rengga.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": name,
"last_name": "Memb",
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let p = await rengga.sendMessage(m.chat, { text: `
*SUCCESSFULLY ADD USER*

TYPE: user

ID: ${user.id}
UUID: ${user.uuid}
USERNAME: ${user.username}
EMAIL: ${user.email}
NAME: ${user.first_name} ${user.last_name}
LANGUAGE: ${user.language}
ADMIN: ${user.root_admin}

*Password telah dikirim di private chat @${u.split`@`[0]}*`, mentions:[u],
})
rengga.sendMessage(u, { text: `*BERIKUT DETAIL AKUN PANEL ANDA*\n
📧EMAIL: ${email}
👤USERNAME: ${username}
🔐PASSWORD: ${password.toString()}
🌐LOGIN: ${domain}
🗓️CREATED AT: ${hariini}

NOTE : SIMPEN BAIK-BAIK AKUN PANEL INI! SAYA/𝐃𝐞𝐧𝐢 𝐁𝐨𝐭𝐳\nTIDAK AKAN MENGIRIM NYA KEDUA KALI NYA.`,
})
}
break
case "delusr": {

if (!isCreator) return m.reply(`Lu Siapa Ngentot?Ini Cuman Khusus RENGGAXD🔥️`)
let usr = args[0]
if (!usr) return m.reply('ID nya mana?')
let f = await fetch(domain + "/api/application/users/" + usr, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return m.reply('*USER NOT FOUND*')
m.reply('*SUCCESSFULLY DELETE THE USER*')
}
break
case "detusr": {
if (!isCreator) return m.reply(`Lu Siapa Ngentot?Ini Cuman Khusus RENGGAXD🔥`)
let usr = args[0]
let f = await fetch(domain + "/api/application/users/" + usr, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = await f.json()
if (res.errors) return m.reply('*USER NOT FOUND*')
let u = res.attributes
m.reply(`*${u.username.toUpperCase()} USER DETAILS*

\`\`\`ID: ${u.id}
UUID: ${u.uuid}
USERNAME: ${u.username}
EMAIL: ${u.email}
NAME: ${u.first_name} ${u.last_name}
LANGUAGE: ${u.language}
ADMIN: ${u.root_admin}
CREATED AT: ${u.created_at}\`\`\``)
}
break
case "listsrv": {
if (!isCreator) return m.reply(`Lu Siapa Ngentot?Ini Cuman Khusus RENGGAXD🔥️`)
let page = args[0] ? args[0] : '1'
let f = await fetch(domain + "/api/application/servers?page=" + page, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = await f.json();
let servers = res.data
let sections = []
for (let server of servers) {
let s = server.attributes
let f3 = await fetch(domain + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + capikey
}
})
let data = await f3.json();
let obj = {
title: "-- PANEL VIP --",
rows: [
{ title: `${s.id}. ${s.name}`, rowId: `${prefix}detsrv ` + s.id, description: `Status: ${data.attributes ? data.attributes.current_state : s.status}` },
]
}
await sections.push(obj)
if (sections.length >= 50 && res.meta.pagination.links.next) {
sections.push({
title: "-- PANEL VIP --",
rows: [
{ title: `⏩ NEXT`, rowId: `${prefix}listsrv 2`, description: 'Page 2' },
{ title: `⏩ NEXT`, rowId: `${prefix}listsrv 3`, description: 'Page 3' },
{ title: `⏩ NEXT`, rowId: `${prefix}listsrv 4`, description: 'Page 4' },
{ title: `⏩ NEXT`, rowId: `${prefix}listsrv 5`, description: 'Page 5' },
]
})
}
}
await rengga.sendMessage(m.chat, {
text: "Berikut list server *PANEL VIP*",
footer: `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}`,
title: "*PANEL VIP*",
buttonText: `${res.meta.pagination.count} Servers`,
sections
}, { quoted: m })
}
break
case "addsrv": {

if (!isCreator) return m.reply(`Lu Siapa Ngentot?Ini Cuman Khusus RENGGAXD🔥️`)
let s = text.split(',');
if (s.length < 7) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} name,tanggal,userId,eggId,locationId,memory/disk,cpu`)
let name = s[0];
let desc = s[1] || ''
let usr_id = s[2];
let egg = s[3];
let loc = s[4];
let memo_disk = s[5].split`/`;
let cpu = s[6];

let f1 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let data = await f1.json();
let startup_cmd = data.attributes.startup

let f = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": desc,
"user": usr_id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo_disk[0],
"swap": 0,
"disk": memo_disk[1],
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
m.reply(`*SUCCESSFULLY ADD SERVER*

TYPE: ${res.object}

ID: ${server.id}
UUID: ${server.uuid}
NAME: ${server.name}
DESCRIPTION: ${server.description}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%
CREATED AT: ${server.created_at}`)
}
break
case "delsrv": {

if (!isCreator) return m.reply(`Lu Siapa Ngentot?Ini Cuman Khusus RENGGAXD🔥️`)
let srv = args[0]
if (!srv) return m.reply('ID nya mana?')
let f = await fetch(domain + "/api/application/servers/" + srv, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return m.reply('*SERVER NOT FOUND*')
m.reply('*SUCCESSFULLY DELETE THE SERVER*')
}
break
case "detsrv": {

let srv = args[0]
let f = await fetch(domain + "/api/application/servers/" + srv, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = await f.json();
if (res.errors) return m.reply('*SERVER NOT FOUND*')
let s = res.attributes
let f2 = await fetch(domain + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + capikey
}
})
let data = await f2.json();
let t = data.attributes
m.reply(`*${s.name.toUpperCase()} SERVER DETAILS*

STATUS: ${t.current_state}

ID: ${s.id}
UUID: ${s.uuid}
NAME: ${s.name}
DESCRIPTION: ${s.description}
MEMORY: ${await (format(t.resources.memory_bytes)).toString()} / ${s.limits.memory === 0 ? 'Unlimited' : s.limits.memory + 'MB'}
DISK: ${await (format(t.resources.disk_bytes)).toString()} / ${s.limits.disk === 0 ? 'Unlimited' : s.limits.disk + 'MB'}
CPU: ${t.resources.cpu_absolute}% / ${s.limits.cpu === 0 ? 'Unlimited' : s.limits.cpu + '%'}
CREATED AT: ${s.created_at}`)
}
break
case 'play': case 'ytplay': {
if (!text) throw `Example : ${prefix + command} story wa anime`
let yts = require("yt-search")
let search = await yts(text)
let anu = search.videos[Math.floor(Math.random() * search.videos.length)]
let buttons = [
{buttonId: `ytmp3 ${anu.url}`, buttonText: {displayText: '♫ Audio'}, type: 1},
{buttonId: `ytmp4 ${anu.url}`, buttonText: {displayText: '► Video'}, type: 1}
]
let buttonMessage = {
image: { url: anu.thumbnail },
caption: `
あ Title : ${anu.title}
あ Ext : Search
あ Id : ${anu.videoId}
🪀 Duration : ${anu.timestamp}
あ Viewers : ${anu.views}
あ Upload At : ${anu.ago}
あ Author : ${anu.author.name}
あ Channel : ${anu.author.url}
あ Description : ${anu.description}
あ Url : ${anu.url}`,
footer: rengga.user.name,
buttons: buttons,
headerType: 4
}
rengga.sendMessage(m.chat, buttonMessage, { quoted: m })
}
break
case 'ytmp4': case 'mp4':{
if (!text) return m.reply('Masukan Link Nya!!!')
reply(mess.wait)
downloadMp4(text)
}
break
case 'ytmp3': case 'mp3':{
if (!text) return m.reply('Masukan Link Nya!!!')
reply(mess.wait)
downloadMp3(text)
}
break
case "setppbot": {
if (!isCreator) return 
if (!quoted) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (!/image/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (/webp/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
var medis = await rengga.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
if (args[0] == `/full`) {
var { img } = await generateProfilePicture(medis)
await rengga.query({
tag: 'iq',
attrs: {
to: botNumber,
type:'set',
xmlns: 'w:profile:picture'
},
content: [
{
tag: 'picture',
attrs: { type: 'image' },
content: img
}
]
})
fs.unlinkSync(medis)
m.reply(`Sukses`)
} else {
var memeg = await rengga.updateProfilePicture(botNumber, { url: medis })
fs.unlinkSync(medis)
m.reply(`Sukses`)
}
}
break
//━━━━━━━━━━━━━━━[ BATAS MENU ]━━━━━━━━━━━━━━━━━//

default:
}
if (budy.startsWith('>')) {
if (!isCreator) return m.reply(`Lu Siapa Ngentot?Ini Cuman Khusus RENGGAXD🔥️`)
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await m.reply(evaled)
} catch (err) {
m.reply(String(err))
}
}
} catch (err) {
m.reply(util.format(err))
}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})