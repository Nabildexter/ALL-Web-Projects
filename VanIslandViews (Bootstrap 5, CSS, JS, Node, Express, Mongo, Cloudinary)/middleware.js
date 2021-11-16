const ExpressError = require("./utilities/ExpressError");
const {campgroundSchema, reviewSchema} = require("./schemas.js");
const Campground = require("./models/campground");
const Review = require("./models/review");

//Middleware make sure user is logged in
module.exports.isLoggedIn = (req, res, next) => {

    console.log("REQ.USER...", req.user);

    

    if(!req.isAuthenticated()){
        
        //Store original request URL
        req.session.returnTo = req.originalUrl;

        req.flash("error", "You must be signed in");
        
        return res.redirect("/login");
    }


    next();
}


//Middleware make sure all info is correct
module.exports.validateCampground = (req, res, next) => {


    //Error if request sent with missing items
    const { error } = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}


//Middleware checking if auhtor is logged in
module.exports.isAuthor = async(req, res, next) => {

    const { id } = req.params;
    const campground = await Campground.findById(id);
    
    
    if (!campground.author.equals(req.user._id)){

        req.flash("error", "You do not have permission to do that!");

        return res.redirect(`/campgrounds/${id}`)

    }   

    next();

}

//Middleware
module.exports.validateReview = (req, res, next) => {

    //Error if request sent with missing items
    const { error } = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.isReviewAuthor = async(req, res, next) => {

    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);

    console.log("-----------------");
    console.log(review);
    console.log("-----------------");
    console.log(req.user._id);
    console.log("-----------------");

    
    if (!review.author.equals(req.user._id)){

        req.flash("error", "You do not have permission to do that!");

        return res.redirect(`/campgrounds/${id}`)

    }   

    next();

}