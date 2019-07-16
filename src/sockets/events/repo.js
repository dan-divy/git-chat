const fetch = require("axios");
const User = require("../../utils/handlers/database").user;
const db = require("../../utils/handlers/database");
const { q } = require("../../server");

module.exports = function(socket, data) {
  fetch({
    method: "GET",
    headers: {
      Authorization: "token " + socket.session.user.accessToken
    },
    url: `https://api.github.com/repos${data}`
  })
    .then(response => {
      const repo = response.data;
      console.log(repo);
      db.get({ value: { id: repo.id } }, function(err, found) {
        if (found) {
          return socket.emit("found", found.value.full_name);
        }
        if (!repo.push) {
          return socket.emit("err", {
            title: "You do not have permission",
            sub:
              "To initialize a repo in Git-Chat you need <b>push</b> permissions."
          });
        }
        if (repo.private) {
          return socket.emit("err", {
            title: "No repo found",
            sub: "There is not repo found or it is private."
          });
        }
      });
      console.log(repo.id);
    })
    .catch(err => {
      socket.emit("err", {
        title: "No repo found",
        sub: "There is not repo found or it is private."
      });
    });
};
