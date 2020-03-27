var express = require("express");
var router = express.Router();
var User  = require("../models/user.js");
const passport = require("passport");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});


router.post("/signup", function(req, res, next) {
    User.register(
        new User({username: req.body.username}),
        req.body.password,
        (err) => {
            if (err){
                err.status = 500;
                res.setHeader("Content-Type", "application/json");
                return res.json({err});

            } else{

                passport.authenticate("local")(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({success: true, status: "Registration Successful!"});
                });
            }
    })
});



router.post("/login", passport.authenticate("local"), function(req, res, next) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    return res.json({success: true, status: "You are Successfully logged in!"});
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
