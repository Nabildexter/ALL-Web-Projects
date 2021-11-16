const Campground = require("../models/campground");
const {cloudinary} = require("../cloudinary")

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({accessToken: mapBoxToken});


//List All
module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", {campgrounds})
}

//New Form
module.exports.renderNewForm = (req, res) => {

    res.render("campgrounds/new");
}

//Post New Campground
module.exports.createCampground = async(req, res, next) => {

    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 10
    }).send();



    const campground = new Campground(req.body.campground);

    //Add Map Geometry Data
    campground.geometry = geoData.body.features[0].geometry;


    //Add this list of images onto
    campground.images = req.files.map(f => ({url: f.path, filename: f.filename}));


    campground.author = req.user._id;

    await campground.save();

    console.log(campground);

    req.flash("success", "Successfully made a new campground!");

    res.redirect(`/campgrounds/${campground._id}`);

}

//Delete Campground
module.exports.deleteCampground = async(req, res) => {
    
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
}


//Edit a Campground Page
module.exports.editCampgroundPage = async(req, res, next) => {

    const {id} = req.params;
    const campground = await Campground.findById(id);

    if(!campground){
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
    
    
    res.render('campgrounds/edit', {campground});

}

//Post an Edited Campground
module.exports.editCamground = async(req, res, next) => {

    const { id } = req.params;
    const campground = await Campground.findById(id);
    

    const camp = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}))

    //Add this list of images onto
    campground.images.push(...imgs);

    await campground.save();
    
    if(req.body.deleteImages){

        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }

        await campground.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}})
    }

    req.flash("success", "Succesfully edited campground!");

    res.redirect(`/campgrounds/${campground._id}`);

}


//Show specific campground page
module.exports.showCampground = async (req, res) => {
    
    const campground = await Campground.findById(req.params.id).populate(
        {
            path: "reviews",
            populate: {
                path: "author"
            }
        }).populate("author");
    
    if(!campground){
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
    

    res.render('campgrounds/show', {campground});
}