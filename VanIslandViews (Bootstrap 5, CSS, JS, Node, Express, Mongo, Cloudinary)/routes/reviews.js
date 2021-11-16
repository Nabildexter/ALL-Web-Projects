const express = require("express");
const router = express.Router({mergeParams: true});

const catchAsync = require("../utilities/catchAsync")


const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware");

const reviews = require("../controllers/reviews")

//Reviews Route
router.post("/", validateReview, isLoggedIn, catchAsync (reviews.postReview));



//Delete Review
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync (reviews.deleteReview))


module.exports = router;