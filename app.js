var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose    = require("mongoose");



var Dormitory  = require("./models/dormitory");
var seedDB      = require("./seed");

mongoose.connect("mongodb://localhost/dormitory");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//seedDB();





app.get("/", function(req, res){
    res.render("welcome");
});


app.get("/sut", function(req, res){
    Dormitory.find({}, function(err, allDorm){
       if(err){
           console.log(err);
       } else {
          res.render("dormitory/index",{dormitories:allDorm});
       }
    });

});


app.get("/sut/:id", function(req, res){
    //find the campground with provided ID
    Dormitory.findById(req.params.id, function(err, foundDormitory){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("dormitory/show", {dormitory: foundDormitory});
        }
    });
})











app.listen(process.env.PORT, process.env.IP,function(){
    console.log("YelpCamp Server Has Started!");
});