const fs = require('fs');
const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));


const aaron_guildID = '813151139120807966';
const aaron_botChannelID = '813167139979526154';

const guildID = '691117221048746025';
const botChannelID = `797992304068919326`;

const prefix = "!";

client.once('ready', () => {
  console.log('Ready!');
});

client.login(process.env.BOT_TOKEN);

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

client.on('message', async msg => {
  // if it doesn't start with prefix, or if it's from a bot, or if its th wrong guild, stop.
  if (!msg.content.startsWith(prefix) || msg.author.bot || msg.guild.id != guildID) return;

  // separate the args from the command
  const args = msg.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  // check if the command exists
  if (!client.commands.has(command)) return;

  // execute the command
  try {
    client.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
})



