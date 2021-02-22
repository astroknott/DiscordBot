const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();

const guildID = '813151139120807966';
const botChannelID = '813167139979526154';

client.once('ready', () => {
  console.log('Ready!');
});

client.login(process.env.BOT_TOKEN);

client.on('message', async msg => {
  if (msg.channel.id == botChannelID && msg.guild.id == guildID) {
    if (msg.content === "hello") {
      await msg.reply("hey, how are ya?");
    }
  }
})
