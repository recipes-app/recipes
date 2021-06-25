const Recipe = require('../models/recipe.model');
const createError = require('http-errors');


module.exports.isAuthenticated = (req, res, next) => {
    if(req.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports.isNotAuthenticated = (req, res, next) => {
    if(req.user) {
        res.redirect('/');
    } else {
        next();
    }
};

/*comprobar author*/

