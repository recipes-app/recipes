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
})
  

/* 
hbs.registerHelper('restaurantHasCategory', function (options) {
  const { restaurant, category } = options.hash;
  if (restaurant?.categories.includes(category)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})




////////////
hbs.registerHelper('selected', (options) => {
    const { ingredient, selectedIngredients } = options.hash;
    if (!selectedIngredients) return false
    return selectedIngredients.includes(ingredient)
  })


hbs.registerHelper('active', (options) => {
    const { match, path } = options.hash;
    return path === match ? 'active' : '';
  }) */