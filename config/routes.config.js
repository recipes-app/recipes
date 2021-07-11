const express = require("express");
const auth = require("../controllers/auth.controller");
const router = express.Router();
const recipes = require("../controllers/recipes.controller");
const secure = require("../middlewares/secure.mid");
const upload = require("../config/multer.config");
const ratings = require("../controllers/ratings.controller");

router.get("/login", auth.login);

router.get("/authenticate/google", auth.loginWithGoogle);
router.get("/authenticate/google/cb", auth.doLoginWithGoogle);

router.get("/logout", auth.logout);

router.get("/profile", secure.isAuthenticated, recipes.listMyRecipe);

router.get("/recipes/new", secure.isAuthenticated, recipes.create);
router.get("/recipes/:id", recipes.detail);
router.post(
  "/recipes",
  secure.isAuthenticated,
  upload.single("image"),
  recipes.doCreate
);
router.get("/recipes/:id/edit", secure.isAuthenticated, recipes.edit);
router.post(
  "/recipes/:id/edit",
  secure.isAuthenticated,
  upload.single("image"),
  recipes.doEdit
);
router.post("/recipes/:id/delete", secure.isAuthenticated, recipes.delete);

router.get("/recipes", recipes.list);
router.get("/recipes/search", recipes.list);

router.post("/recipes/:id/ratings", secure.isAuthenticated, ratings.doCreate);
router.get("/recipes/:id", ratings.list);

router.get("/", (req, res) => {
  res.redirect("/recipes");
});

module.exports = router;
