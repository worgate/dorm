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


app.get("/", function(req, res){
    res.render("welcome");
});


app.get("/sut", function(req, res){
    Dormitory.find({}, function(err, allDorm){
       if(err){
           console.log(err);
       } else {
          res.render("dormitory/index",{dormitories:allDorm, currentUser: req.user});
       }
    });

});
app.get("/sut/create",isLoggedIn, function(req, res){
    //find the campground with provided ID
    res.send("create form");
});

app.get("/sut/:id", function(req, res){
    //find the campground with provided ID
    Dormitory.findById(req.params.id).populate("comments").exec(function(err, foundDormitory){
        if(err){
            console.log(err);
        } else {
            var ip = req.connection.remoteAddress;

            //render show template with that campground
            res.render("dormitory/show", {dormitory: foundDormitory});
        }
    });
});

// ====================
// COMMENTS ROUTES
// ====================

app.get("/sut/:id/comments/new", isLoggedIn, function(req, res){
    // find campground by id
    Dormitory.findById(req.params.id, function(err, dormitory){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {dormitory: dormitory});
        }
    })
});

app.post("/sut/:id/comments",isLoggedIn,function(req, res){
   //lookup dormitory using ID
   Dormitory.findById(req.params.id, function(err, dormitory){
       if(err){
           console.log(err);
           res.redirect("/sut");
       } else {
        
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               dormitory.comments.push(comment);
               dormitory.save();
               res.redirect('/sut/' + dormitory._id);
           }
        });
       }
   });

});

//  ===========
// AUTH ROUTES
//  ===========

// show register form
app.get("/register", function(req, res){
   res.render("register"); 
});
//handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        console.log("Registered")
        passport.authenticate("local")(req, res, function(){
           res.redirect("/sut"); 
        });
    });
});

// show login form
app.get("/login", function(req, res){
   res.render("login"); 
});
// handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/sut",
        failureRedirect: "/login"
    }), function(req, res){
});

// logic route
app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/sut");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP,function(){
    console.log("YelpCamp Server Has Started!");
});