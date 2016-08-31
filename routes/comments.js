var express = require("express");
var router  = express.Router({mergeParams: true});
var Dormitory = require("../models/dormitory");
var Comment = require("../models/comment");


// ====================
// COMMENTS ROUTES
// ====================
// /sut/:id/comments"

router.get("/new", isLoggedIn, function(req, res){
    // find campground by id
    Dormitory.findById(req.params.id, function(err, dormitory){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {dormitory: dormitory});
        }
    })
});

router.post("/",isLoggedIn,function(req, res){
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

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;