// const db = require("../db/queries");
const { prisma } = require('../viewController');

const bcrypt = require("bcryptjs");

const { validationResult } = require("express-validator");

const { getCloudinaryObj } = require('../../config/cloud');

const { bytesToMegabytes } = require('../../utils');


async function handleUploadFile(req, res, next) {



  try {
    const cloudFileObj = await getCloudinaryObj(filePath);

    const date = new Date().toISOString().split('T')[0]; 
    const byteSize = bytesToMegabytes(cloudFileObj.size);
    let folderID = null;

    if (req.params.folderID) {
      folderID = parseInt(req.params.folderID);
    }

    await prisma.files.create({
      data: {
        createdAt: date,
        cloudUrl: String(cloudFileObj),
        fileName: cloudFileObj.fileName,
        size: byteSize,
        folderID: folderID,
        authorId: req.user.id
      }
   });
    res.redirect("/home");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

async function handleCreateUser(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("signup", {
      errors: errors.array(),
    });
  }
  
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
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