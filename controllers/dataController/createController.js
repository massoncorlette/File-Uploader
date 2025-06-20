// const db = require("../db/queries");

const { PrismaClient } = require('../../generated/prisma/client');
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

const { validationResult } = require("express-validator");


async function handleCreateUser(req, res, next) {
  console.log("Form data:", req.body);
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).render("signup", {
      errors: errors.array(),
    });
  }
  
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword);
    await prisma.user.create({
      data: {
        email: req.body.email,
        fname: req.body.fname,
        lname: req.body.lname,
        password: hashedPassword,
      }
   });
  res.redirect("/");

  } catch (error) {
    console.error(error);
    next(error);
  }
};

async function handleCreateFolder(req, res, next) {

  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).render("signup", {
      errors: errors.array(),
    });
  }

  try {

    await prisma.folders.create({
      data: {
        name: req.body.foldername
      }
   });
  res.redirect("home");
    
  } catch (error) {
    console.error(error);
    next(error);    
  }
};


module.exports = { handleCreateUser, handleCreateFolder };