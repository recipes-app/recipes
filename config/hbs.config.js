const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname,'../views/partials'));

hbs.registerHelper('selected', (options) => {
    const { ingredient, selectedIngredients } = options.hash;
    if (!selectedIngredients) return false
    return selectedIngredients.includes(ingredient)
  })
  


/* hbs.registerHelper('active', (options) => {
    const { match, path } = options.hash;
    return path === match ? 'active' : '';
  }) */