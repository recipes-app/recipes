const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname,'../views/partials'));

hbs.registerHelper('recipeHasIngredient', function (options) {
  const { ingredient, recipe } = options.hash;
  if (recipe?.ingredients?.includes(ingredient)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper('recipeHasKeyWord', function (options) {
  const { keyWord, recipe } = options.hash;
  if (recipe?.keyWords?.includes(keyWord)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
