const mongoose = require("mongoose");
const Recipe = require("../models/recipe.model");
const createError = require("http-errors");
const ingredients = require("../data/ingredients.json");
const keyWords = require("../data/keywords.json");

module.exports.list = (req, res, next) => {
  Recipe.find()
    .sort({ createdAt: "desc" }) /*ordenar tb x valoracion*/
    .limit(8)
    .then((recipes) => {
      res.render("recipes/list", { recipes });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.detail = (req, res, next) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      if (recipe) {
        res.render("recipes/detail", { recipe });
      } else {
        res.redirect("/recipes");
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.create = (req, res, next) => {
  res.render("recipes/new", {
    ingredients: ingredients,
    keyWords: keyWords,
  });
};

module.exports.doCreate = (req, res, next) => {
  let recipeIngredients = req.body.ingredients;
  if (recipeIngredients && !Array.isArray(recipeIngredients)) {
    recipeIngredients = [recipeIngredients];
  }

  const recipe = new Recipe({
    title: req.body.title,
    image: req.body.image,
    ingredients: recipeIngredients,
    cookingTime: req.body.cookingTime,
    directions: req.body.directions,
    author: req.user.id,
    rating: req.body.rating,
    keyWords: keyWords,
  });
  console.log(recipe);
  recipe
    .save()
    .then(() => res.redirect("/recipes"))
    .catch((error) => {
      console.log(error);
      if (error instanceof mongoose.Error.ValidationError) {
        res.render("recipes/new", {
          errors: error.errors,
          recipe: req.body,
          ingredients,
          keyWords,
        });
      } else {
        next(error);
      }
    });
};
