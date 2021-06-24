const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title:{
        type: String,
        required: 'title is required',
        minLength: [3, 'title should have at least 3 letters']
    },
    image:{
        type: String,
    },
});

const Recipe = mongoose.model('Recipe', userSchema);
module.exports = Recipe;
