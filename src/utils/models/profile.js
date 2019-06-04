var mongoose = require("mongoose");
var config = require("../../../package");

mongoose
    .connect("mongodb://localhost:27017/" + config.name, {useNewUrlParser: true})
    .catch((err) => {
      console.error(err.name +  " error: " + err + "\n\nTry running npm run mongo")
    });

const schema = new mongoose.Schema({
   id:{
       type:String
   },
   username:{
       type:String
   },
   email:{
       type:String
   }
});

module.exports = mongoose.model("user", schema);