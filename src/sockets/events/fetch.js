const fetch = require("axios");
const User = require("../../utils/handlers/database").user;
const db = require("../../utils/handlers/database");
const { q } = require("../../server");
const usersRunning = [];

const asyncForEach = async function(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

module.exports = function(socket, data) {
  db.get({ key: socket.session.user.id.toString() }, function(err, user) {
    console.log(socket.session.user.accessToken);
    q.push(function(cb) {
      if (!user) return;
      user.value.repos = [];
      fetch({
        method: "GET",
        headers: {
          Authorization: "token " + socket.session.user.accessToken
        },
        url: `https://api.github.com/user/repos?type=all`
      })
        .then(async response => {
          const repos = response.data;
          const progress = { done: 0, total: repos.length };
          socket.emit("repo_count", progress);
          asyncForEach(repos, async r => {
            const res = await fetch({
              method: "GET",
              url: r.contributors_url
            });
            r.collaborators = res.data;
            if (
              r.collaborators.length > 1 &&
              !user.value.repos.find(f => f.full_name == r.full_name) &&
              r.collaborators.find(c => c.id == user.value.id)
            )
              await user.value.repos.push(r);
            progress.done++;
            socket.emit("repo_count", progress);
          }).then(() => {
            user = User(user);
            user.save(function(err, u) {
              if (err) console.error(err);
              cb(null, user.value.id);
            });
          });
        })
        .catch(error => {
          console.log(error.response);
        });
    });
    q.on("success", function(result, job) {
      if (result == user.value.id) {
        socket.emit("finished", true);
        console.log("Finished job for " + user.value.username);
      }
    });
  });
};
