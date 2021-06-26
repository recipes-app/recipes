const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ingredients = require('../data/ingredients.json');

const recipeSchema = new Schema({
    title:{
        type: String,
        required: 'title is required',
        minLength: [3, 'title should have at least 3 letters']
    },
    image:{
        type: String,
        default:"https://lh3.googleusercontent.com/proxy/s5xLWD-UZnfx9E_rSK_Kzd9N8kyfNTioMezzD7Op8Lv9tHkLeBj_V8nf9Ev5FDqBS3ENVznuqBBI4HoAtloaINCRkiAxuXmrLNvEYsTxkGfuN5DKsqZhL7Naz6Nmsbwe",
    },
    ingredients:{
        type: [{
            type: String,
            enum: ingredients,
        }],
        default: [],
    },
    cookingTime:{
        type: String,
        required: 'cooking time is required',
    },
    directions:{
        type: String,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    keyWords:{
        type: [String],
        default:[],
    },
},
{ timestamps: true },
);

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
