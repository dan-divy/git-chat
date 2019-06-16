const fetch = require('axios');
const db = require('../utils/handlers/database');
module.exports = function (data, socket) {
    db.get({_id: socket.session.user._id.toString()}, function(err, user) {
        if(!user) return;
        user.value.repos = [];
        fetch({
            method: 'GET',
            url: socket.session.user.repos_url
        }).then(async response => {
            const repos = response.data;
            const asyncForEach = async function(array, callback) {
                for (let index = 0; index < array.length; index++) {
                    await callback(array[index], index, array);
                }
            };
            await asyncForEach(repos, async r => {
                const res = await fetch({
                    method: 'GET',
                    headers: {'Authorization': 'token ' + socket.session.user.accessToken},
                    url: r.contributors_url
                });
                if((res.data.find(u => u.id == socket.session.user.id) && parseInt(res.data.find(u => u.id == socket.session.user.id).contributions) >= 1) ) {
                    await user.value.repos.push(r);
                    console.log(user.value.repos.length)
                }
            })
            db.save({_id: socket.session.user._id.toString()}, user, function(err, u) {
                socket.emit('finished', true);
            })
        });
    })
}