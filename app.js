const passport = require('passport');
const createError = require('http-errors');
const express = require('express');

const app = express();
const path = require('path');

require('./config/hbs.config');
require('./config/db.config');
require('./config/passport.config');
const session = require('./config/session.config');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

const router = require('./config/routes.config');
app.use('/', router);


app.use((req, res, next) => {
    next(createError(404, 'Page not found'));
  });
  
  app.use((error, req, res, next) => {
    console.error(error);
    const status = error.status || 500;
  
    res.status(status)
      .render('error', {
        message: error.message,
        error: req.app.get('env') === 'development' ? error : {},
      });
  });


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Ready! App listening on port ${port}`)
});