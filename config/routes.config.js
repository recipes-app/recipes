const express = require('express');
const auth = require('../controllers/auth.controller');
const router = express.Router();
const recipes = require('../controllers/recipes.controller');
const secure = require('../middlewares/secure.mid');

router.get('/login', auth.login);
/*router.post('/login', auth.doLogin);
router.get('/logout', auth.logout);
*/
router.get('/authenticate/google', auth.loginWithGoogle);
router.get('/authenticate/google/cb', auth.doLoginWithGoogle);

/*app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',failureRedirect: '/login' }));
*/
router.get('/', (req, res) => {res.render('recipes/list')});
router.get('/logout', auth.logout);


router.get('/recipes/new', secure.isAuthenticated, recipes.create);
router.get('/recipes/:id', recipes.detail);
router.post('/recipes', secure.isAuthenticated, recipes.doCreate);
router.get('/recipes/:id/edit', secure.isAuthenticated, recipes.edit);
/*router.post('/recipes/:id/edit', secure.isAuthenticated, recipes.doEdit);*/
router.get('/recipes/:id/delete', secure.isAuthenticated, recipes.delete);

router.get('/recipes', recipes.list);

module.exports = router;