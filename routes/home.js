const express = require("express");
const { Router } = require("express");
const { displayHome } = require("../controllers/viewController");

const homeRouter = Router();

homeRouter.get("/", (req, res, next) => {

  return displayHome(req, res, next);
});


module.exports = homeRouter;