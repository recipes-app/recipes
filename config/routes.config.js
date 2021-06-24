const express = require('express');
const auth = require('../controllers/auth.controller');
const router = express.Router();

router.get('/login', auth.login);
/*router.post('/login', auth.doLogin);
router.get('/logout', auth.logout);
*/
router.get('/authenticate/google', auth.loginWithGoogle);
router.get('/authenticate/google/cb', auth.doLoginWithGoogle);

router.get('/', (req, res) => {res.render('recipes/list')});
router.get('/logout', auth.logout);

module.exports = router;