const mongoose = require('mongoose');
const config = require('../../../package');

mongoose.connect('mongodb://localhost:1212/' + config.name, {useNewUrlParser: true})
    .catch(err => console.error(err.name +  ' error: ' + err + '\n\nTry running npm run mongo'));

const schema = new mongoose.Schema({
    key: mongoose.Schema.Types.Mixed,
    value: mongoose.Schema.Types.Mixed
}, {
    strict:false
});

var Db = mongoose.model('database', schema);

const functions = {
    getAll: function (cb) {
        Db
        .find({})
        .exec((err, docs) => {
            if (err) return cb(err, false);
            if(docs) {
                return cb(null, docs);
            } else {
                return cb(null, false)
            }
        })
    },


    set: function(key, value, cb) {
        if(!key) return false;
        if(!value) return false;
        var newDoc = new Db({key, value});
        console.log(JSON.stringify(newDoc))
        newDoc.save();
        cb(true);
    },


    get: function(key, cb) {
        Db.findOne({key}, function(err, res)  {
            if (err) return cb(err, false);
            if(res) {
                return cb(null, res);
            } else {
                return cb(null, false)
            }
        })
    }
}

module.exports = functions;