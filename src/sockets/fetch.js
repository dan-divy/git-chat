const fetch = require("axios");
const User = require("../utils/handlers/database").user;
const db = require("../utils/handlers/database");
module.exports = function(data, socket) {
  db.get({ key: socket.session.user.id.toString() }, function(err, user) {
    if (!user) return;
    user.value.repos = [];
    fetch({
      method: "GET",
      url: socket.session.user.repos_url
    }).then(async response => {
      const repos = response.data;
      const asyncForEach = async function(array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
      };
      asyncForEach(repos, async r => {
        if (r.owner.id == socket.session.user.id) {
          user.value.repos.push(r);
        } else {
          const res = await fetch({
            method: "GET",
            headers: {
              Authorization: "token " + socket.session.user.accessToken
            },
            url: r.contributors_url
          });
          if (
            res.data.find(u => u.id == socket.session.user.id) &&
            parseInt(
              res.data.find(u => u.id == socket.session.user.id).contributions
            ) >= 1
          ) {
            await user.value.repos.push(r);
          }
        }
      }).then(() => {
        user = User(user);
        user.save(function(err, u) {
          if (err) console.error(err);
          socket.emit("finished", true);
        });
      });
    });
  });
};
