// const db = require("../db/queries");
const { prisma } = require('../viewController');

const bcrypt = require("bcryptjs");

const { validationResult } = require("express-validator");

const { getCloudinaryObj } = require('../../config/cloud');

const { bytesToMegabytes } = require('../../utils');


async function handleUploadFile(req, res, next) {

  console.log(req.file);

  console.log(req.user);

  filePath = req.file.path;

  try {
    const cloudImageUrl = getCloudinaryObj(filePath);

    const date = new Date().toISOString().split('T')[0]; 
    const byteSize = bytesToMegabytes(cloudImageUrl.size);

    await prisma.files.create({
      data: {
        createdAt: date,
        cloudUrl: cloudImageUrl.url,
        fileName: cloudImageUrl.original_filename,
        size: byteSize,
        // folederID: req.params,
      //  authorId: req.user.id
      }
   });


    res.redirect("/home");
  } catch (error) {
    console.error(error);
    next(error);
  }

}

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
    return res.status(400).render("home", {
      errors: errors.array(),
    });
  }

  try {

    await prisma.folders.create({
      data: {
        name: req.body.foldername,
        authorId: req.user.id
      }
   });
  res.redirect("/home");
    
  } catch (error) {
    console.error(error);
    next(error);    
  }
};


module.exports = { handleCreateUser, handleUploadFile, handleCreateFolder };