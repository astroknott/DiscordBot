module.exports = {
  name: 'spell',
  description: 'Display description and details of given spell',
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
      msg.channel.send(data.name + ": " + data.desc)
    }
  },
};
