const fs = require("file-system");

module.exports = function(socket) {
  fs.readdir(__dirname + "/events", (err, files) => {
    files.forEach(f => {
      socket.on(f.split(".")[0], function(data) {
        try {
            const run = require("./events/" + f);
            run(socket, data);
        } catch (err) {
            console.error(err);
        }
      });
    });
  });
};
