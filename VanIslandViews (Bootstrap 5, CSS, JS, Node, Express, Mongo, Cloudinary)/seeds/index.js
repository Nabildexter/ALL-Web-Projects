const express = require("express");
const app = express();
const portnum = 3100;

const path = require("path");


const mongoose = require("mongoose");
const Campground = require("../models/campground");

//import cities file data
const cities = require("./cities");
const campground = require("../models/campground");


//import seed helpers stuff
const {places, descriptors} = require("./seedHelpers");


//View Engines and Directories
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


mongoose.connect("mongodb://localhost:27017/yelpCamp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});


const sample = array => array[Math.floor(Math.random() * array.length)];



const seedDB = async () =>{

    await Campground.deleteMany({});

    for(let i = 0; i < 50; i++){

        const rand1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) +10;
        const camp = new Campground ({

            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images:[    {
                url: 'https://res.cloudinary.com/dxlyfwbco/image/upload/v1636646988/VanIslandViews/uo7r2hhxlirpfqgsfsdy.jpg',
                filename: 'VanIslandViews/uo7r2hhxlirpfqgsfsdy'
              },
              {
                url: 'https://res.cloudinary.com/dxlyfwbco/image/upload/v1636646988/VanIslandViews/drlkrzuli8e3skihsfvo.jpg',
                filename: 'VanIslandViews/drlkrzuli8e3skihsfvo'
              }],
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
            price:price,
            author: "61852fd660e2451648b2c71c",
            geometry: { 
                type: 'Point',
                coordinates: [
                    cities[rand1000].longitude,
                    cities[rand1000].latitude
                ]
            }
    })

        await camp.save();

    } 


}

seedDB();