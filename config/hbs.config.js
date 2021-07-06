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


hbs.registerHelper("isRecipeAuthor", function (options) {
  const { user, recipe } = options.hash;
  if (
    user &&
    (user.id == recipe.author?.id || user.id == recipe.author)
  ) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper('average', function (options) { 
  const { ratings, index } = options.hash
  if ( (ratings.reduce((a, b) => (a.rate + b.rate)) / ratings.length) >= index) {
    return '´strella activa'
  } else {
    return 'éstrella no activa'
  }
})




/*helpers.avg = function() {
  var args = [].concat.apply([], arguments);
  // remove handlebars options object
  args.pop();
  return helpers.sum(args) / args.length;
};*/