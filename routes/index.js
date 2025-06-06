const express = require("express");
const { Router } = require("express");
const { displayLogin } = require("../controllers/viewController");

const indexRouter = Router();
indexRouter.use(express.urlencoded({ extended: true }));

indexRouter.get("/", async (req, res, next) => {
  return displayLogin(req, res, next);
});








module.exports = indexRouter;
