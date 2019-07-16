const fetch = require("axios");
const User = require("../../utils/handlers/database").user;
const db = require("../../utils/handlers/database");
const { q } = require("../../server");

module.exports = function(socket, data) {
  q.push(function(cb) {
    fetch({
      method: "GET",
      headers: {
        Authorization: "token " + socket.session.user.accessToken
      },
      url: `https://api.github.com/repos${data}`
    }).then(response => {
      const repo = response.data;
      console.log(repo);
    });
  });
  q.on("success", function(result, job) {});
};
