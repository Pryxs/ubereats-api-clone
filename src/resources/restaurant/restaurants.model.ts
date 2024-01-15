const mongoose = require('mongoose');


export const RestaurantSchema = new mongoose.Schema({
    name: String,
        address: String,
        city: String,
        country: String,
        stars: {
            type: Number,
            min: 1,
            max: 5
        },
        cuisine: String,
        priceCategory: {
            type: Number,
            min: 1,
            max: 3
        },
    });