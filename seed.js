var mongoose = require("mongoose");
var Dormitory = require("./models/dormitory");
var data = [
    {
           name: "พัทธนันท์ ปาร์ค",
           image: "http://www.renthub.in.th/images/uploaded/201404/20140410/apartment_pictures/normal/f616eb915353d27bee85133b7f041a13.jpg?1397146898",
           description: "Good Place",
           price : "5000 - 7000",
           address : "มทส. ประตู 4",
           rating : "4",
           editor : true
    },
    {
           name: "พัทธนันท์ ปาร์ค",
           image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
           description: "Good Place",
           price : "5000 - 7000",
           address : "มทส. ประตู 4",
           rating : "4",
           editor : true
    },
    {
            name: "ASDASDASD ASDASD",
           image: "http://www.renthub.in.th/images/uploaded/201404/20140410/apartment_pictures/normal/f616eb915353d27bee85133b7f041a13.jpg?1397146898",
           description: "Good Place",
           price : "5000 - 7000",
           address : "มทส. ประตู 4",
           rating : "4",
           editor : false
    }
]

function seedDB(){
   //Remove all campgrounds
   Dormitory.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed dormitory!");
         //add a few campgrounds
        data.forEach(function(seed){
            Dormitory.create(seed, function(err, dormitory){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a dormitory");
                    //create a comment
                }
            });
        });
    }); 
   
}

module.exports = seedDB;
