var mongoose = require("mongoose");
var dormitorySchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   price : String,
   address : String,
   rating : Number,
   editor : Boolean
});

module.exports = mongoose.model("Dormitory", dormitorySchema);