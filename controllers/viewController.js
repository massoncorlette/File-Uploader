
// const db = require("../db/queries");

async function displayLogin(req, res, next) {

  res.render("index");
}

async function displayHome(req, res, next) {

  res.render("home");

}

module.exports = { 
  displayLogin,
  displayHome
};
