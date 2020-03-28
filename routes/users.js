var express = require("express");
var router = express.Router();
var User  = require("../models/user.js");
const passport = require("passport");
const authenticate = require("../authenticate");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});


router.post("/signup", function(req, res, next) {
    User.register(
        new User({username: req.body.username}),
        req.body.password,
        (err, user) => {
            if (err){
                err.status = 500;
                res.setHeader("Content-Type", "application/json");
                return res.json({err});

            } else{
                if(req.body.firstname){
                    user.firstname = req.body.firstname;
                }

                if(req.body.lastname){
                    user.lastname = req.body.lastname;
                }

                user.save( err => {
                    if(err){
                        res.statusCode = 500;
                        res.setHeader("Content-Type", "application/json");
                        return res.json({err: err});
                    }
                });
                passport.authenticate("local")(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    // const token = authenticate.getToken({_id: req.user._id}) should you give the use a token when signup ? up to you
                    res.json({success: true, token, status: "Registration Successful!"});
                });
            }
    })
});



router.post("/login", passport.authenticate("local"), function(req, res, next) {
    const token = authenticate.getToken({_id: req.user._id})
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    return res.json({success: true, token,  status: "You are Successfully logged in!"});
});



router.get("/logout", function(req, res, next) {
    if (req.session){
        req.session.destroy();
        res.clearCookie("session-id");
        res.redirect("/");

    } else {
        const err = new Error("You are not logged in!");
        err.status = 403;
        return next(err);
    }
});


module.exports = router;
