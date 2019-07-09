const fetch = require("axios");
const User = require("../utils/handlers/database").user;
const db = require("../utils/handlers/database");
module.exports = function(data, socket) {
  db.get({ key: socket.session.user.id.toString() }, function(err, user) {
    if (!user) return;
    user.value.repos = [];
    let url = user.value.events_url;
    fetch({
      method: "GET",
      headers: {
        Authorization: "token " + socket.session.user.accessToken
      },

      url: `https://api.github.com/user/repos?type=all`
    }).then(async response => {
      const repos = response.data;
      const asyncForEach = async function(array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
      };
      asyncForEach(repos, async r => {
        const res = await fetch({
          method: "GET",
          headers: {
            Authorization: "token " + socket.session.user.accessToken
          },
          url: r.contributors_url
        });
        r.collaborators = res.data;
        if (
          r.collaborators.length > 1 &&
          !user.value.repos.find(f => f.full_name == r.full_name)
        )
          user.value.repos.push(r);
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
