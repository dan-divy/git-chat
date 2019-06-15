const fetch = require('axios');
const db = require('../utils/handlers/database');
module.exports = function (data, socket) {
    db.get(socket.session.user.id, function(err, user) {
        user.repos = [];
        fetch({
            method: 'GET',
            url: socket.session.user.repos_url
        }).then(response => {
            const repos = response.data;
            repos.forEach(r => {
                fetch({
                    method: 'GET',
                    headers: {'Authorization': 'token ' + socket.session.user.accessToken},
                    url: r.contributors_url
                }).then(res => {
                    if(res.data.find(u => u.id == socket.session.user.id) && res.data.find(u => u.id == socket.session.user.id).contributions >= 1) {
                        user.repos.push(r);
                    }
                })
            })
            user.save(function(err, obj) {
                socket.emit('finished', true);
                console.log('hi')
            })
        });
    })
}