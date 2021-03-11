const fs = require('fs');
const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
const { BOT_TOKEN, AARON_GUILDID, GUILDID, PREFIX } = process.env;

client.once('ready', () => {
  console.log('Ready!');
});

client.login(BOT_TOKEN);

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

client.on('message', async msg => {
  // if it doesn't start with prefix, or if it's from a bot, or if its th wrong guild, stop.
  if (!msg.content.startsWith(PREFIX) || msg.author.bot || (msg.guild.id != GUILDID && msg.guild.id != AARON_GUILDID)) return;

  // separate the args from the command
  const args = msg.content.slice(PREFIX.length).trim().split(' ');
  const commandName = args.shift().toLowerCase();

  // check if the command exists
  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${msg.author}`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${PREFIX}${command.name} ${command.usage}\``;
    }
    return msg.channel.send(reply);
  }

  // execute the command
  try {
    command.execute(msg, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
})



