var express = require("express");
var router  = express.Router();
var Dormitory = require("../models/dormitory");

// /sut/


router.get("/", function(req, res){
    Dormitory.find({}, function(err, allDorm){
       if(err){
           console.log(err);
       } else {
          res.render("dormitory/index",{dormitories:allDorm, currentUser: req.user});
       }
    });

});
router.get("/create",isLoggedIn, function(req, res){
    //find the campground with provided ID
    res.send("create form");
});

router.get("/:id", function(req, res){
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

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;