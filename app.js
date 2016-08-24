var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.render("welcome");
});


app.get("/home", function(req, res){
    res.render("dormitory/index");
});












app.listen(process.env.PORT, process.env.IP,function(){
    console.log("YelpCamp Server Has Started!");
});