const mongoose = require("mongoose");
const { Recipe, listKeyWords } = require("../models/recipe.model");
const createError = require("http-errors");

module.exports.list = (req, res, next) => {
  const { search } = req.query;
  const criterial = {};
  if (search) {
    criterial.$or = [
      { title: new RegExp(search, "i") }, 
      { keyWords: search }
    ];
  }
  Recipe.find(criterial)
    .sort({ createdAt: "desc" }) /*ordenar tb x valoracion*/
    .limit(8)
    .then((recipes) => {
      res.render("recipes/list", { recipes, search });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.detail = (req, res, next) => {
  Recipe.findById(req.params.id)
    .populate("author")
    .populate("ratings")
    .then((recipe) => {
      if (recipe) {
        console.log("recipe", recipe)
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
  listKeyWords()
    .then((keyWords) => {
      res.render("recipes/new", { keyWords });
    })
    .catch((error) => next(error));
};

module.exports.doCreate = (req, res, next) => {
  console.log(req.body);

  console.log("REQ.FILE", req.file);
  let newRecipe = {
    title: req.body.title,
    ingredients: req.body.ingredients,
    cookingTime: req.body.cookingTime,
    servings: req.body.servings,
    directions: req.body.directions,
    author: req.user.id,
    rating: req.body.rating,
    keyWords: req.body.keyWords,
  };

  if (req.file) {
    newRecipe.image = req.file.path;
  }

  new Recipe(newRecipe)
    .save()
    .then((recipe) => {
      console.log(recipe);
      res.redirect("/recipes");
    })
    .catch((error) => {
      console.log(error);
      if (error instanceof mongoose.Error.ValidationError) {
        listKeyWords()
          .then((keyWords) => {
            res.render("recipes/new", {
              errors: error.errors,
              recipe: req.body,
              keyWords,
            });
          })
          .catch((error) => next(error));
      } else {
        next(error);
      }
    });
};

module.exports.edit = (req, res, next) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      res.render("recipes/edit", {
        recipe: recipe,
        ingredients,
        keyWords,
      });
    })
    .catch((err) => next(err));
};

module.exports.doEdit = (req, res, next) => {
  delete req.body.author;
  if (req.file) {
    console.log(req.file);
    req.body.image = req.file.path;
  }

  Recipe.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  }) //preguntar
    .then((recipe) => res.redirect(`/recipes/${recipe.id}`))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        req.body.id = req.params.id;
        res.status(400).render("recipes/edit", {
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
  console.log(req.params.id);
  Recipe.findByIdAndDelete(req.params.id)
    .then((recipe) => {
      console.log(recipe, "ha sido eliminado");
      res.redirect("/recipes");
    })
    .catch((error) => next(error));
};

module.exports.search = (req, res, next) => {
  /*console.log(recipe)*/
  Recipe.find(req.body)
    .then((recipes) => {
      res.render("recipes/search", { recipes });
    })
    .catch((error) => next(error));
};

module.exports.listMyRecipe = (req, res, next) => {
  Recipe.find()
    .sort({ createdAt: 'desc' })
    .then((recipes) => {
      res.render('users/profile', { recipes});
    })
    .catch((err) => {
      next(err);
    });
};
