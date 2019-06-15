const sio = require('../../bin/www').sio;
const connected = require('./connected');
const sessionMiddleware = require('../server').sessionMiddleware;

sio.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});
sio.use(function(socket, next) {
    socket.session = socket.request.session;
    next();
});

sio.on('connection', connected);

module.exports = sio;