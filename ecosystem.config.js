const config = require("./package.json");
module.exports = {
  apps : [{
    name: config.name,
    script: "./bin/www",
    instances: 1,
    autorestart: true,
    max_memory_restart: "1G"
  }]
};