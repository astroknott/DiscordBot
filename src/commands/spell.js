module.exports = {
  name: 'spell',
  description: 'Display description and details of given spell',
  args: true,
  usage: '<spell>',
  execute(msg, args) {
    const axios = require('axios');
    const spellsAPI = axios.create({
      baseURL: "https://www.dnd5eapi.co/api/spells/",
      timeout: 1000,
    });
    let arg = args[0];

    spellsAPI.get(arg)
      .then(function(response) {
        spellCommand(response);
      })
      .catch(function(error) {
        console.log(error);
      });

    function spellCommand(res) {
      let data = res.data;
      let { range, name, desc, duration: dur, components: comps, material: mats, concentration: conc, casting_time: cast, level, school: { name: school } = {}, higher_level: hiLv } = data;
      let sep = `   |   `;
      let titleLine = `**${name}**${sep}Level ${level} ${school}\n\n`;
      let descr = `${desc.join("\n")}\n\n`;
      let concDisplay = () => { return conc ? `**Concentration**${sep}` : "" };
      let highLine = `*${hiLv}*`;

      let details = `**Range**: ${range}${sep}**Duration**: ${dur}${sep}${concDisplay()}**Casting Time**: ${cast}${sep}**${comps.join(" ")}**${sep}**Materials**: ${mats}\n`;
      msg.channel.send(`${titleLine}${descr}${details}${highLine}`, { split: true });
    }
  },
};
