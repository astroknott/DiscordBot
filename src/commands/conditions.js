module.exports = {
  name: 'conditions',
  description: 'List all conditions with descriptions',
  execute(msg, args) {

    const condAPI = axios.create({
      baseURL: "https://www.dnd5eapi.co/api/conditions/",
      timeout: 1000,
    });

    condAPI.get(args)
      .then(function(response) {
        conditionCommand(response);
      })
      .catch(function(error) {
        console.log(error);
      });

    function conditionCommand(res) {
      let conditions = res.data.results;
      console.log(conditions);
    }
  },
};
