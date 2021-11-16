if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}



const express = require("express");
const app = express();
const portnum = process.env.PORT || 3000;

//Require packages
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utilities/ExpressError");

const session = require("express-session");
const flash = require("connect-flash");

const MongoStore = require('connect-mongo');


const passport = require("passport");
const localStrategy = require("passport-local");

const mongoSanitize = require('express-mongo-sanitize');

// const helmet = require("helmet");

//Parser and Method Overrides
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));


//Require Routes 
const campgrounds = require("./routes/campgrounds");
const reviews = require("./routes/reviews");
const userRoutes = require("./routes/user");
const User = require("./models/user");


//Set View Engine
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); 



//Public directory
app.use(express.static(path.join(__dirname, "public")));


app.use(mongoSanitize());


//Session and Cookies and store
const dbURL = process.env.DB_URL || "mongodb://localhost:27017/yelpCamp";
// const dbURL = "mongodb://localhost:27017/yelpCamp"

const secret = process.env.SECRET || "ThisIsASecretKey";

const store = new MongoStore({
    mongoUrl: dbURL, 
    secret,
    touchAfter: 24 * 60 * 60 
});


store.on("error", function(e) {
    console.log("Session Store Error!", e);
})



const sessionConfig = {
    store,
    name: "sessionName",
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());


// app.use(helmet({contentSecurityPolicy: false}));


//Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




//Connect Database 
// const dbURL = process.env.DB_URL
// const dbURL = "mongodb://localhost:27017/yelpCamp"


// mongoose.connect("mongodb://localhost:27017/yelpCamp", {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false

// });

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false

});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});



app.use((req, res, next) => {

    // console.log(req.session);

    res.locals.currentUser = req.user;

    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");

    next();
})



//Use Routes
app.use("/campgrounds", campgrounds);
app.use("/campgrounds/:id/reviews", reviews);
app.use("/", userRoutes);



//Error Handler Results 
app.use((err, req, res, next) => {
    
    const {statusCode = 500} = err;
    
    if(!err.message){
        err.message = "Something went wrong";
    }

    res.status(statusCode).render("error", { err });
    
})



//Nothing is matched at all
app.get("/", (req, res) =>{
    
    res.render("home");
})



//Nothing is matched at all
app.all("*", (req, res,next ) =>{
    next(new ExpressError("Page Not Found!", 404));
})



//Start YelpCamp Server
app.listen(portnum, () => {
    console.log("Server Listening on Port " + portnum + " ...");
})