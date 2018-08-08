const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("Komutlar")
  .setDescription('')
  .setColor(0x00ffff)
  .addField("**Eğlence ve Kullanıcı Komutları:**", `	O!banned = Dene ve Gör! \nO!avatarım = Avatarınınızı Gösterir. \nO!herkesebendençay = Herkese Çay Alırsınız. \nO!koş = Koşarsınız.\nO!çayiç = Çay İçersiniz. \nO!çekiç = İstediğiniz Kişiye Çekiç Atarsınız. \nO!çayaşekerat = Çaya Şeker Atarsınız. \nO!yumruh-at = Yumruk Atarsınız. \nO!yaz = Bota İstediğiniz Şeyi Yazdırırsınız. \nO!sunucuresmi = BOT Sunucunun Resmini Atar. \nO!sunucubilgi = BOT Sunucu Hakkında Bilgi Verir. \nO!kullanıcıbilgim = Sizin Hakkınızda Bilgi Verir. `)
  .addField("**Yetkilisi Komutlar**", `O!ban = İstediğiniz Kişiyi Sunucudan Banlar. \nO!kick  = İstediğiniz Kişiyi Sunucudan Atar. \nO!unban = İstediğiniz Kişinin Yasağını Açar. \nO!sustur = İstediğiniz Kişiyi Susturur. \nO!oylama = Oylama Açar. \nO!duyuru = Güzel Bir Duyuru Görünümü Sağlar.`)
  .addField("**Ana Komutlar**", "O!yardım = BOT Komutlarını Atar. \nO!bilgi = BOT Kendisi Hakkında Bilgi Verir. \nO!ping = BOT Gecikme Süresini Söyler. \nO!davet = BOT Davet Linkini Atar. \nO!istatistik = BOT İstatistiklerini Atar.")
  .addField("**Yapımcı**", " **OR |💻OyuncuReisHD#0421** ")
  .setFooter('**--------------------------**')
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.send(embedyardim);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.author.send('asciidoc', `= ${command.help.name} = \n${command.help.description}\nDoğru kullanım: ` + prefix + `${command.help.usage}`);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp', 'help', 'y'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım [komut]'
};
