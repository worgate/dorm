var express = require("express");
var router  = express.Router({mergeParams: true});
var Dormitory = require("../models/dormitory");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// ====================
// COMMENTS ROUTES
// ====================
// /sut/:id/comments"

router.get("/new", middleware.isLoggedIn, function(req, res){
    // find campground by id
    Dormitory.findById(req.params.id, function(err, dormitory){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {dormitory: dormitory});
        }
    })
});


//create new comment
router.post("/", middleware.isLoggedIn,function(req, res){
   //lookup dormitory using ID
   Dormitory.findById(req.params.id, function(err, dormitory){
       if(err){
           console.log(err);
           res.redirect("/sut");
       } else {
            
        // dormitory.comments.forEach(function(comment){
        //     Comment.findById(comment, function(err, foundComment) {
        //         if(err){
        //             console.log(err);
        //         }else {
        //             console.log(foundComment['author']);
        //         }
        //     })
            
        // });
        
        Comment.create(req.body.comment, function(err, comment){
          if(err){
              console.log(err);
          } else {
              
              comment.author.id = req.user._id;
              comment.author.username = req.user.username;
              comment.save();
              dormitory.comments.push(comment);
              dormitory.save();
              console.log(comment);
              res.redirect('/sut/' + dormitory._id);
          }
        });
        
       }
   });

});


// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {dormitory_id: req.params.id, comment: foundComment});
      }
   });
});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/sut/" + req.params.id );
      }
   });
});





router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/sut/" + req.params.id);
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