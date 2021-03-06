var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");


router.get("/", function(req, res){
    res.render("welcome");
});



// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});
//handle sign up logic
router.post("/register", function(req, res){
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
router.get("/login", function(req, res){
   res.render("login"); 
});
// handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/sut",
        failureRedirect: "/login"
    }), function(req, res){
});

// logic route
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/sut");
});


router.get("/pwd", function(req, res){
   var  newPasswordString = 'aaa';
   User.findByUsername('qqq').then(function(sanitizedUser){
    if (sanitizedUser){
        sanitizedUser.setPassword(newPasswordString, function(){
            sanitizedUser.save();
            res.status(200).json({message: 'password reset successful'});
        });
    } else {
        res.status(500).json({message: 'This user does not exist'});
    }
},function(err){
    console.error(err);
})
});






module.exports = router;