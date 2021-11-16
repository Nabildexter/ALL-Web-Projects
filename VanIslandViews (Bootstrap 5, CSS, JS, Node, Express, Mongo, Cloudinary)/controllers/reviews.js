
const Campground = require("../models/campground");
const Review = require("../models/review");

module.exports.postReview = async (req, res) => {

    const campground = await Campground.findById(req.params.id);

    const review = new Review(req.body.review);

    review.author = req.user._id;

    campground.reviews.push(review);
    await review.save();
    await campground.save();

    req.flash("success", "Succesfully added review!");


    res.redirect(`/campgrounds/${campground._id}`)
}


module.exports.deleteReview = async (req, res) => {

    //get ID of both objects
    const {id, reviewId} = req.params;

    //Pull it out from the campground's list of reviews
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});

    //Delete it
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Succesfully deleted review!");

    res.redirect(`/campgrounds/${id}`);
}