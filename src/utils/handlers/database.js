const mongoose = require("mongoose");
const config = require("../../../package");

mongoose
  .connect("mongodb://localhost:27017/" + config.name, {
    useNewUrlParser: true
  })
  .catch(err =>
    console.error(err.name + " error: " + err + "\n\nTry running npm run mongo")
  );

const schema = new mongoose.Schema(
  {
    key: mongoose.Schema.Types.Mixed,
    value: mongoose.Schema.Types.Mixed
  },
  {
    strict: false
  }
);

var Db = mongoose.model("database", schema);

const functions = {
  getAll(cb) {
    Db.find({}).exec((err, docs) => {
      if (err) {
        return cb(err, false);
      }
      if (docs) {
        return cb(null, docs);
      } else {
        return cb(null, false);
      }
    });
  },

  save(key, value, cb) {
    Db.findOne(key, function(err, res) {
      if (res) {
        res = value;
        res = new Db(res);
        res.save(function(err, obj) {
          cb(err, obj);
        });
      }
    });
  },

  set(key, value, cb) {
    console.log(key);
    if (!key || !value) {
      return false;
    }
    var newDoc = new Db({ key, value });
    newDoc.save(function(err, doc) {
      cb(doc);
    });
  },

  get(key, cb) {
    console.log(key);
    Db.findOne(key, function(err, res) {
      if (res) {
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
    if (!profile.id) {
      return cb("Login not authenticated", null);
    }
    this.get({ key: profile.id }, function(err, user) {
      if (!user) {
        let newUser = profile._json;
        newUser.username = profile._json.login.replace(" ");
        newUser.mentions = [];
        newUser.notifications = [];
        newUser.repos = [];
        require("./database").set(profile.id, newUser, function(u) {
          console.log("New user:" + u);
          cb(null, u);
        });
      } else {
        console.log("Found User: " + user);
        cb(null, user);
      }
    });
  },
  user: Db
};
module.exports = functions;
