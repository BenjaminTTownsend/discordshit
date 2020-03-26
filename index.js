require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const LogChannel = process.env.LOGCHANNEL
const WelcomeChannel = process.env.WELCOMECHANNEL
const BotChannel = process.env.BOTCHANNEL
const DefaultRole = process.env.ROLE
const hypixelAPIkey = process.env.HYPIXELAPI
const prefix = process.env.PREFIX;


const HypixelAPI = require('hypixel-api')
const client = new HypixelAPI(hypixelAPIkey)


bot.on('error', console.error);

bot.on('ready', () => {
  const Embed0 = new Discord.MessageEmbed()
  .setColor('#ff0000')
  .setAuthor("Enigma", "https://cdn.discordapp.com/avatars/"+bot.user.id+"/"+bot.user.avatar+".png")
  .addField("Bot has loaded", "<@"+bot.user.id+">", true)
  bot.channels.cache.get(BotChannel).send(Embed0)
    console.info(`Logged in as ${bot.user.tag}`);
    bot.user.setPresence({ 
      activity:
        {
          type: "PLAYING",
          name: "Good Morning!"},
          status: "idle"
        })
    setTimeout(function (){ 
    bot.user.setPresence({ 
      activity:
        {
          type: "WATCHING",
          name: "Enigma Members"},
          status: "online"
        })
      }, 5000)
    });
  bot.on("messageDelete", messageDelete =>{
    if(messageDelete.author.bot) return;
    const Embed2 = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setAuthor("Message Deleted", "https://cdn.discordapp.com/avatars/"+messageDelete.author.id+"/"+messageDelete.author.avatar+".png")
    .addField("Author", "<@"+messageDelete.author.id+">", true)
    .addField("Channel", messageDelete.channel, true)
    .addField("Message", messageDelete.content)
    .setFooter(`Message ID: ${messageDelete.id} | Author ID: ${messageDelete.author.id}`);
    bot.channels.cache.get(LogChannel).send(Embed2)
  });
  bot.on("guildMemberAdd", guildMemberAdd =>{
    const embed12 = new Discord.MessageEmbed()
    .setColor('#6a0dad')
    .addField("User", "<@"+guildMemberAdd.id+">", true)
    .setAuthor("Member Joined", "https://cdn.discordapp.com/avatars/"+guildMemberAdd.user.id+"/"+guildMemberAdd.user.avatar+".png")
    .setDescription("Welcome To The Official Enigma discord if you're looking to apply please read #information channel.")
    .setTimestamp(guildMemberAdd.joinedTimestamp);
    bot.channels.cache.get(WelcomeChannel).send(embed12)
    guildMemberAdd.roles.add([DefaultRole]);
    setTimeout(function (){ 
      const embed3 = new Discord.MessageEmbed()
      .setColor('#00FF00')
      .addField("User", "<@"+guildMemberAdd.id+">", true)
      .addField("Roles", guildMemberAdd.roles.highest, true)
      .setAuthor("Member Joined", "https://cdn.discordapp.com/avatars/"+guildMemberAdd.user.id+"/"+guildMemberAdd.user.avatar+".png")
      .setTimestamp(guildMemberAdd.joinedTimestamp);
      bot.channels.cache.get(LogChannel).send(embed3)
    }, 500)
  });
  bot.on("guildMemberRemove", guildMemberRemove =>{
    const embed4 = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .addField("User", "<@"+guildMemberRemove.id+">", true)
    .addField("Roles", guildMemberRemove.roles.highest, true)
    .setAuthor("Member Left", "https://cdn.discordapp.com/avatars/"+guildMemberRemove.user.id+"/"+guildMemberRemove.user.avatar+".png")
    .setTimestamp(guildMemberRemove.joinedTimestamp);
    bot.channels.cache.get(LogChannel).send(embed4)
  });
  bot.on("messageUpdate", (oldMessage, newMessage) =>{
    if (oldMessage.author.bot) return;
    if (oldMessage.content === newMessage.content) return;
    if(!oldMessage.partial) {
    const OldMSG = oldMessage
    const NewMSG = newMessage
    const embed5 = new Discord.MessageEmbed()
    .setColor('#6a0dad')
    .setAuthor("Message Edited", "https://cdn.discordapp.com/avatars/"+NewMSG.author.id+"/"+NewMSG.author.avatar+".png")
    .addField("User", "<@"+NewMSG.author.id+">")
    .addField("Channel", NewMSG.channel)
    .addField("Before", OldMSG.content)
    .addField("After", NewMSG.content)
    .setFooter(`ID: ${NewMSG.id}`)
    .setTimestamp(OldMSG.setTimestamp);
    bot.channels.cache.get(LogChannel).send(embed5)
  }; 
  });
  bot.on("channelCreate", channelCreate =>{
    const embed6 = new Discord.MessageEmbed()
    .setColor('#00FF00')
    .addField("Channel", channelCreate.name, true)
    .setAuthor("Channel Created", "https://cdn.discordapp.com/avatars/"+bot.user.id+"/"+bot.user.avatar+".png")
    .setTimestamp(channelCreate.createdTimestamp);
    bot.channels.cache.get(LogChannel).send(embed6)
  });
  bot.on("channelDelete", channelDelete =>{
    const embed7 = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .addField("Channel", channelDelete.name, true)
    .setAuthor("Channel Deleted", "https://cdn.discordapp.com/avatars/"+bot.user.id+"/"+bot.user.avatar+".png")
    .setTimestamp(channelDelete.createdTimestamp);
    bot.channels.cache.get(LogChannel).send(embed7)
  });
  bot.on("guildMemberUpdate", (oldMember, newMember) =>{ 
    if(oldMember.nickname !== newMember.nickname) {
      const embed8 = new Discord.MessageEmbed()
      .setColor('#6a0dad')
      .setAuthor("Nickname Changed", "https://cdn.discordapp.com/avatars/"+newMember.user.id+"/"+newMember.user.avatar+".png")
      .addField("User", "<@"+newMember.id+">")
      .addField("Before", oldMember.nickname)
      .addField("After", newMember.nickname)
      .setFooter(`ID: ${newMember.id}`)
      .setTimestamp(newMember.setTimestamp);
      bot.channels.cache.get(LogChannel).send(embed8)
    } else {
      return;
    }
  });
  bot.on("roleCreate", roleCreate =>{
    const embed9 = new Discord.MessageEmbed()
    .setColor('#00FF00')
    .addField("Role", roleCreate.name, true)
    .setAuthor("Role Created", "https://cdn.discordapp.com/avatars/"+bot.user.id+"/"+bot.user.avatar+".png")
    .setTimestamp(roleCreate.createdTimestamp);
    bot.channels.cache.get(LogChannel).send(embed9)
  });
  bot.on("roleDelete", roleDelete =>{
    const embed10 = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .addField("Role", roleDelete.name, true)
    .setAuthor("Role Deleted", "https://cdn.discordapp.com/avatars/"+bot.user.id+"/"+bot.user.avatar+".png")
    .setTimestamp(roleDelete.createdTimestamp);
    bot.channels.cache.get(LogChannel).send(embed10)
  });
  bot.on("roleUpdate", (oldRole, NewRole) =>{
    if(oldRole.name !== NewRole.name) {
      const embed11 = new Discord.MessageEmbed()
      .setColor('#6a0dad')
      .setAuthor("Role Updated", "https://cdn.discordapp.com/avatars/"+bot.user.id+"/"+bot.user.avatar+".png")
      .addField("Before",oldRole.name)
      .addField("After", NewRole.name)
      .setDescription("A roles name was updated.")
      .setTimestamp(NewRole.setTimestamp);
      bot.channels.cache.get(LogChannel).send(embed11)
    } else {
      return;
    }
  });
    

const TOKEN = process.env.TOKEN;
bot.login(TOKEN);