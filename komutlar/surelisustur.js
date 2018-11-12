const Discord = require("discord.js");
const ms = require("ms");
const client = new Discord.Client();

exports.run = async (client, message, args) => {

  //!süreli-sustur@üye 1s/m/h/d | 1s = 1 saniye , 1m = 1 dakika , 1h = 1 saat, 1d = 1 gün

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Yanlış yazdınız doğru yazım:b/süreli-sustur <kullanıcı> <süre> ");
  if(tomute.hasPermission("VIEW_AUDIT_LOG")) return message.reply("Bu kişi yetkilidir");
let muterole = message.guild.roles.find(r => r.name === "Muted");

  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#818386",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("Yanlış yazdınız doğru yazım:b/süreli-sustur <kullanıcı> <süre>");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> başarıyla susturuldu! ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> Kişinin susturulma süresi dolduğu için mutesi kaldırıldı!`);
  }, ms(mutetime));



}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['süreli-sustur', 'tempmute'],
  permLevel: 1
};

exports.help = {
  name: 'süreli-sustur',
  description: 'Modların ve üstündeki kişilerin 2 tane uyarı alanları süreli susturmasına yarar.',
  usage: 'süreli-sustur [Kullanıcı] [Süre]'
};
