module.exports = {
  name: 'condition',
  description: 'Display description of given condition',
  args: true,
  usage: '<condition>',
  execute(msg, args) {
    const axios = require('axios');
    const condAPI = axios.create({
      baseURL: "https://www.dnd5eapi.co/api/conditions/",
      timeout: 1000,
    });
    let arg = args[0];

    condAPI.get(arg)
      .then(function(response) {
        conditionCommand(response);
      })
      .catch(function(error) {
        console.log(error);
      });

    function conditionCommand(res) {
      let data = res.data;
      let desc = data.desc.join("\n");

      msg.channel.send(`**${data.name}**: \n${desc}`);
    }
  },
};
