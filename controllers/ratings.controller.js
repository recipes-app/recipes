const mongoose = require("mongoose");
const Rating = require("../models/rating.model");
const { Recipe, listKeyWords } = require("../models/recipe.model");

module.exports.create = (req, res, next) => {
  res.render("recipes/detail");
};

module.exports.doCreate = (req, res, next) => {
  console.log("req.body",req.body);
  Rating.create({
    user: req.user.id,
    recipe: req.params.id,
    rate: Number(req.body.rate),
    review: req.body.review,
  })
    .then(() => {
      res.redirect(`/recipes/${req.params.id}`);
    })
    .catch(next);
};
