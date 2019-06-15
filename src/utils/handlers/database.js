const mongoose = require("mongoose");
const config = require("../../../package");

mongoose.connect("mongodb://localhost:27017/" + config.name, {useNewUrlParser: true})
    .catch((err) => console.error(err.name +  " error: " + err + "\n\nTry running npm run mongo"));

const schema = new mongoose.Schema({
    key: mongoose.Schema.Types.Mixed,
    value: mongoose.Schema.Types.Mixed
}, {
    strict:false
});

var Db = mongoose.model("database", schema);

const functions = {
    getAll(cb) {
        Db
        .find({})
        .exec((err, docs) => {
            if (err) {
                return cb(err, false);
            }
            if(docs) {
                return cb(null, docs);
            } else {
                return cb(null, false);
            }
        });
    },


    set(key, value, cb) {
        if(!key || !value) {
            return false;
        }
        var newDoc = new Db({key, value});
        newDoc.save();
        cb(newDoc);
    },


    get(key, cb) {
        Db.findOne({key: key.toString()}, function(err, res)  {
            if(res) {
                return cb(null, res);
            } else {
                if (err) {
                    return cb(err, false);
                }
                return cb(null, false);
            }
        });
    },

    findOrCreate(profile, cb) {
        if(!profile.id) {
            return cb('Login not authenticated', null)
        }
        this.get(profile.id, function(err, user) {
            if(!user || !user.mentions) {
                let newUser = profile._json;
                newUser.username = profile._json.login;
                newUser.mentions = [];
                newUser.notifications = [];
                require('./database').set(profile.id, newUser, function(user){
                    cb(null, newUser);
                })
            } else {
                cb(null, user.value)
            }
        })
    }
};

module.exports = functions;