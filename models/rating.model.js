const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('../models/user.model');
const Recipe = require('../models/recipe.model');

const ratingSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        recipe: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipe",
        },
        rate: {
            type: Number,
            min: [1, 'min value must be 1'],
            max: 5,
        },
        review: {
            type: String,
            maxLength: [250, 'maximun length of review is up to 250 characters']
        }
    },
    { timestamps: true }
);

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;
