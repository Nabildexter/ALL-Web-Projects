const express = require("express");
const router = express.Router();

const catchAsync = require("../utilities/catchAsync")

const Campground = require("../models/campground");


const {isLoggedIn, isAuthor, validateCampground} = require("../middleware")

const campgrounds = require("../controllers/campgrounds");


//Multer and Cloduinary
const {storage} = require("../cloudinary");
const multer = require("multer");
const upload = multer({storage})



router.route("/")
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array("image"),validateCampground, campgrounds.createCampground);
    // .post(upload.array("image"), (req, res) => {
    //     console.log(req.body, req.files);
    //     res.send("It worked");
    // })

// //List Campgrounds
// router.get("/", catchAsync(campgrounds.index));


//Make a new Campground
router.get("/new", isLoggedIn, campgrounds.renderNewForm);



router.route("/:id")
    .get(catchAsync (campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array("image"), validateCampground, catchAsync(campgrounds.editCamground))
    .delete(isAuthor, isLoggedIn, catchAsync(campgrounds.deleteCampground));

 

//Edit a Campground
router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.editCampgroundPage));


// //Post new Campground
// router.post("/", isLoggedIn, validateCampground, campgrounds.createCampground);



// //Delete Campground
// router.delete("/:id", isAuthor, isLoggedIn, catchAsync(campgrounds.deleteCampground))



// //Post Updated/Edited a Campground
// router.put("/:id", isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.editCamground))


// //List Specific Campgrounds with ID
// router.get("/:id", catchAsync (campgrounds.showCampground))



module.exports = router;