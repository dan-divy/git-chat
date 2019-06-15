module.exports = function(socket) {
    socket.on('fetch', function(data) {
        const fetch = require('./fetch');
        fetch(data, socket);
    });
}