const { Router } = require("express");
const { handleCreateUser } = require("../controllers/dataController/createController");
const { validateCreateUser } = require("../controllers/validation");

const signupRouter = Router();

signupRouter.get("/", (req, res) => res.render("signup"));

signupRouter.post("/", validateCreateUser(),  handleCreateUser);



module.exports = signupRouter