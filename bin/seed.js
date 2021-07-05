require("dotenv").config();

require("../config/db.config");
const axios = require("axios");
const mongoose = require('mongoose');
const { Recipe } = require('../models/recipe.model');
const User = require('../models/user.model');
const users = require('../data/users.json')

const http = axios.create({
  baseURL: "https://api.spoonacular.com",
});

function listRecipes() {
  return http
    .get("/recipes/random", {
      params: {
        apiKey: process.env.SPOONACULAR_API_KEY,
        number: 50,
      },
    })
    .then((response) => response.data.recipes);
}

mongoose.connection.once("open", () => {
  console.info(
    `*** Connected to the database ${mongoose.connection.db.databaseName} ***`
  );
  mongoose.connection.db
    .dropDatabase()
    .then(() => console.log(`- Database dropped`))
    .then(() => User.create(users))
    .then((users) => {
        return listRecipes()
            .then(apiRecipes => {
                const recipes = apiRecipes.map(recipe => {
                    const author = users[Math.floor(Math.random() * users.length)]
                    return {
                        title: recipe.title,
                        summary: recipe.summary,
                        image: recipe.image,
                        ingredients: recipe.extendedIngredients.map(ingredient => {
                            return {
                                name: ingredient.nameClean,
                                amount: ingredient.amount,
                                unit: ingredient.unit,
                            }
                        }),
                        cookingTime: recipe.readyInMinutes,
                        servings: recipe.servings,
                        directions: recipe.instructions,
                        keyWords: recipe.cuisines.concat(recipe.dishTypes, recipe.diets, recipe.occasions),
                        author: author.id,
                    }
                })
                return Recipe.create(recipes)
            })
    })
    .then(recipes => console.log(`added ${recipes.length} recipes to db`))
    .catch((error) => console.error(error))
    .then(() => mongoose.connection.close())
});
