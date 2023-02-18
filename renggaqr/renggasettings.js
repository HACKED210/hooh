const fs = require('fs')
const chalk = require('chalk')

global.domain = "https://yandex.com" // Isi Domain Lu
global.apikey = 'ptla_G3al3dGbqJodafum4tXa3WYFwZnmiGvZBUiycWeFC19' // Isi Apikey Plta Lu
global.capikey = 'ptlc_sU9ehdc1hxxV0IPKtajm9G0RsfcpJ4KiUBJtkrHF8mp' // Isi Apikey Pltc Lu
global.creAtor = "6285730734652@s.whatsapp.net"
global.owner = ['6285730734652']
global.ownerNumber = ["6285730734652@s.whatsapp.net"]
global.nomerOwner = "6285730734652"
global.namabotnya = 'RENGGA PANEL'
global.namaownernya = 'RENGGA XD'
global.packname = '© By RenggaXD'
global.author = 'Subscribe : RenggaXD'
global.sessionName = 'session'
global.email = 'keposelet@gmail.com'
global.group = ''
global.youtube = 'https://youtube.com/@RenggaXD'
global.website = 'https://instagram.com/rengganofake'
global.github = 'https://github.com/RenggaXcz'
global.nomorowner = 'https://wa.me/6285730734652'
global.region = 'I`m From Indonesia'
global.prefa = ['','!','.','#','-','•']
global.mess = 
{
success: '```Success✅```',
admin: '```Fitur Khusus Admin Group!!!```',
botAdmin: '```Bot Harus Menjadi Admin Terlebih Dahulu!!!```',
owner: '```Fitur Khusus Owner Bot!!!```',
group: '```Fitur Digunakan Hanya Untuk Group!!!```',
private: '```Fitur Digunakan Hanya Untuk Private Chat!!!```',
bot: '```Fitur Khusus Pengguna Nomor Bot!!!```',
error: '```Mungkin Lagi Error Kak Harap Lapor Owner Biar Langsung Di Benerin🙏```',
wait: '```Waittt...```'
}

global.thumb = fs.readFileSync('./didinjs/image/thumb.jpg')
global.imagekir = fs.readFileSync('./didinjs/image/didin.jpg')
global.videokir = fs.readFileSync('./didinjs/image/didin.mp4')

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})