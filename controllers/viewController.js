
// const db = require("../db/queries");

async function displayLogin(req, res, next) {

  res.render("index");
}

async function displayHome(req, res, next, files) {

  res.render("home", {files:files});

}

module.exports = { 
  displayLogin,
  displayHome
};
