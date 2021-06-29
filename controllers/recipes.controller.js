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
    .populate("user")
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
  console.log('REQ.FILE', req.file)
  let newRecipe = {
    title: req.body.title,
    ingredients: recipeIngredients,
    cookingTime: req.body.cookingTime,
    servings: req.body.servings,
    directions: req.body.directions,
    author: req.user.id,
    rating: req.body.rating,
    keyWords: keyWords,
  }

  if (req.file) {
    newRecipe.image = req.file.path;
  }

  new Recipe(newRecipe)
    .save()
    .then((recipe) => {
       console.log(recipe)
       res.redirect("/recipes")
      })
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

module.exports.edit = (req, res, next) => {
  Recipe.findById(req.params.id)
    .then(recipe => {
      res.render('recipes/edit', 
      {
        recipe: recipe,
        ingredients,
        keyWords,
      })
    })
    .catch(err => next(err))
  
};

module.exports.doEdit = (req, res, next) => {

  delete req.body.author;
  if (req.file) {
    console.log(req.file)
    req.body.image = req.file.path;
  }
  
  Recipe.findByIdAndUpdate(req.params.id, req.body, {runValidators: true, new: true})    //preguntar 
  .then((recipe) => res.redirect(`/recipes/${recipe.id}`))
  .catch((error) => {
    if(error instanceof mongoose.Error.ValidationError) {
      req.body.id = req.params.id;
      res.status(400).render('recipes/edit', {
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

module.exports.delete = (req, res, next) => {
  console.log(req.params.id)
  Recipe.findByIdAndDelete(req.params.id)
    .then((recipe) => {
      console.log(recipe, 'ha sido eliminado')
      res.redirect('/recipes')
    })
    .catch(error => next(error));
};
