var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose    = require("mongoose");
var passport    = require("passport");
var LocalStrategy = require("passport-local");

//DB
var User        = require("./models/user");
var Dormitory  = require("./models/dormitory");
var Comment     = require("./models/comment");
var seedDB      = require("./seed");

//requiring routes
var commentRoutes    = require("./routes/comments"),
    dormitoryRoutes = require("./routes/dormitories"),
    indexRoutes      = require("./routes/index")

mongoose.connect("mongodb://localhost/dormitory");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//seedDB();

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));//authenticate from UserSchema.plugin(passportLocalMongoose);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});


app.use("/", indexRoutes);
app.use("/sut", dormitoryRoutes);
app.use("/sut/:id/comments", commentRoutes);






app.listen(process.env.PORT, process.env.IP,function(){
    console.log("YelpCamp Server Has Started!");
});