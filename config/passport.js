
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../db/pool');
const { checkUserByEmail, checkUser } = require('../db/queries');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await checkUserByEmail(username);

      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }

      //comparing login password to hashed stored password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" })
      }
      
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await checkUser(id);
  


    done(null, user);
  } catch(err) {
    done(err);
  }
});


const { validationResult } = require("express-validator");

const authenticateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("index", {
      errors: errors.array(),
    });
  }

  // If no validation errors, authenticate with passport
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
  })(req, res, next);
};
  

module.exports = authenticateUser;
