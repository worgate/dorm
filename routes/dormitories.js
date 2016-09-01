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

router.post("/",isLoggedIn, function(req, res){

        var name = req.body.name;
        var image = req.body.image;
        var desc = req.body.description;
        var description = "Good Place";
        var price = "5000 - 7000";
        var address = "มทส. ประตู 4";
        var rating = "4";
        var editor = false;
        
        var author = {
            id: req.user._id,
            username: req.user.username
        }
        var newDorm = {
                        name: name, 
                        image: image, 
                        description: desc, 
                        price: price, 
                        address: address ,
                        rating: rating,
                        author: author
        }
        
        Dormitory.create(newDorm, function(err, dormitory){
                if(err){
                    console.log(err)
                } else {
                    res.redirect("/sut/"+dormitory['_id']);
                }
            });
});

router.get("/new",isLoggedIn, function(req, res){
    //find the campground with provided ID
    res.render("dormitory/new");
});

router.get("/:id", function(req, res){
    //find the campground with provided ID
    Dormitory.findById(req.params.id).populate("comments").exec(function(err, foundDormitory){
        if(err){
            console.log(err);
        } else {
            
            
            res.render("dormitory/show", {dormitory: foundDormitory});
        }
    });
});

router.delete("/:id", function(req, res){
   Dormitory.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/sut");
      } else {
          res.redirect("/sut");
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