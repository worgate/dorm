var Dormitory = require("../models/dormitory");
var Comment = require("../models/comment");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkDormOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Dormitory.findById(req.params.id, function(err, foundDormitory){
           if(err){
               res.redirect("/sut");
           }  else {
               // does user own the campground?
            if(foundDormitory.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("/sut");
            }
           }
        });
    } else {
        res.redirect("/sut");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;