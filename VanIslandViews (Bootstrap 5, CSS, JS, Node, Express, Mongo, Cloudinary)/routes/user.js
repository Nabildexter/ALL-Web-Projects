const express = require("express");
const passport = require("passport");
const { isLoggedIn } = require("../middleware");


const router = express.Router();

const catchAsync = require("../utilities/catchAsync")

const users = require("../controllers/users");


router.route("/register")
    .get(users.registerPage)
    .post(catchAsync(users.registerUser))


router.route("/login")
    .get(users.loginUserPage)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: "/login" }), users.logIn);


router.get("/logout", isLoggedIn, users.logOut);


module.exports = router;