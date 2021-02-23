const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
const axios = require('axios');

const aaron_guildID = '813151139120807966';
const aaron_botChannelID = '813167139979526154';

const guildID = '691117221048746025';
const botChannelID = `797992304068919326`;

const prefix = "!";

const spellsAPI = axios.create({
  baseURL: "https://www.dnd5eapi.co/api/spells/",
  timeout: 1000,
});

client.once('ready', () => {
  console.log('Ready!');
});

client.login(process.env.BOT_TOKEN);

client.on('message', async msg => {
  if (msg.channel.id == botChannelID && msg.guild.id == guildID) {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    const commandlets = command.split('-');
    const command_main = commandlets[0];
    const command_mod = commandlets.length >= 1 ? commandlets[1] : 0;
    let arg = args.join("-").toLowerCase();

    spellsAPI.get(arg)
      .then(function(response) {
        if (command_main === "spell") {
          spellCommand(command_mod, response);
        }
      })
      .catch(function(error) {
        console.log(error);
      });

    function spellCommand(mod, res) {
      let data = res.data;

      if (mod) {
        if (mod === "q") {
          let components = data.components.join("");
          msg.channel.send(data.name + " " + data.school.name + " " + data.casting_time + " " + data.range + " " + data.duration + " " + components)
        }
      } else {
        msg.channel.send(data.name + ": " + data.desc)
      }
    }
  }
})



