const fetch = require("axios");
const User = require("../../utils/handlers/database").user;
const db = require("../../utils/handlers/database");
const { q } = require("../../server");

module.exports = function(socket, data) {
    console.log(data)
}