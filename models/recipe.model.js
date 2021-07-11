const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Rating = require('../models/rating.model')

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
          name: String,
          amount: Number,
          unit: String,
        },
      ],
      default: [],
    },
    cookingTime: {
      type: Number,
      required: "cooking time is required",
    },

    servings: {
      type: Number,
      min: [1, "the minimum number of servings is 1"],
      max: [100, "the maximum number of servings is 100"],
      required: [true, "number of servings is required"],
    },

    directions: {
      type: String,
      minLength: [100, "directions should have at least 100 letters"],
      required: "you have to put recipe directions"
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    keyWords: {
      type: [String],
      default: [],
      required: "at least one key word is required",
    },
  },
  { timestamps: true }
);

recipeSchema.virtual('ratings', {
  ref: 'Rating',
  localField: '_id',
  foreignField: 'recipe',
  justOne: false,
});

//anadir virtual de valoraciones y calcular media

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports.Recipe = Recipe;

module.exports.listKeyWords = () => {
  return Recipe.distinct("keyWords");
};
