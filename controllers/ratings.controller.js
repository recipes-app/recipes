const mongoose = require("mongoose");
const User = require("../models/user.model");
const Rating = require("../models/rating.model");
const {
  Recipe,
  listKeyWords
} = require("../models/recipe.model");
const createError = require("http-errors");

module.exports.create = (req, res, next) => {
  res.render("recipes/detail");
};

module.exports.doCreate = (req, res, next) => {
  console.log(req.body)
  Rating.create({
      user: req.user.id,
      recipe: req.params.id,
      rate: Number(req.body.rate),
      review: req.body.review,
    })
    .then(() => {
      res.redirect(`/recipes/${req.params.id}`);
    })
    .catch((err) => {
      console.log(err.errors.rate)
      Recipe.findById(req.params.id)
      .populate("author")
      .populate("ratings")
      .then((recipe) => {
          res.render("recipes/detail", { recipe });
      })      
    });
};

module.exports.list = (req, res, next) => {
  Rating.find()
    .populate('user')
    .sort({ createdAt: 'desc' })
    .then((ratings) => res.render('recipes/detail', { ratings }))
    .catch((error) => next(error));
};