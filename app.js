var  express    = require("express"),
     app        = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("welcome");
});


app.get("/home", function(req, res){
    res.send("home");
});












app.listen(process.env.PORT, process.env.IP,function(){
    console.log("YelpCamp Server Has Started!");
});