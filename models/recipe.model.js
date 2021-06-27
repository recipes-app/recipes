const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ingredients = require("../data/ingredients.json");
const keyWords = require("../data/keywords.json");

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: "title is required",
      minLength: [3, "title should have at least 3 letters"],
    },
    image: {
      type: String,
      default:
        "https://www.stjeromebilingual.org/wp-content/uploads/2019/07/empty-plate.jpg",
    },
    ingredients: {
      type: [
        {
          type: String,
          enum: ingredients,
        },
      ],
      default: [],
    },
    cookingTime: {
      type: String,
      required: "cooking time is required",
    },

    // servings: {
    //   type: Number,
    //   min: [1, "the minimum number of servings is 1"],
    //   max: [100, "the maximum number of servings is 100"],
    //   required: [true, "number of servings is required"],
    // },

    directions: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    keyWords: {
      type: [
        {
          type: String,
          enum: keyWords,
        },
      ],
      default: [],
      required: "at least one key word is required",
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
