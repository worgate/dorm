var mongoose = require("mongoose");
var dormitorySchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   price : String,
   address : String,
   rating : Number,
   editor : Boolean,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
   
   
});

module.exports = mongoose.model("Dormitory", dormitorySchema);