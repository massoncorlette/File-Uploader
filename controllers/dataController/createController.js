// const db = require("../db/queries");
const { prisma } = require('../viewController');

const bcrypt = require("bcryptjs");

const { validationResult } = require("express-validator");

const { getCloudinaryObj } = require('../../config/cloud');

const { bytesToMegabytes } = require('../../utils');


async function handleUploadFile(req, res, next) {

  const filePath = req.file.path;

  console.log(req.file);

  try {
    const cloudFileObj = await getCloudinaryObj(filePath);
    console.log(cloudFileObj);

    const now = new Date();
    // ( 1/1/25 Format Formula Conversion)
    const date = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear() % 100}`;

    const byteSize = Math.round(bytesToMegabytes(cloudFileObj.size));

    console.log(byteSize, "byte");

    if (byteSize >= 10) {
      throw new Error('Max upload size of 10MB Exceeded');
    }

    let folderID = null;

    if (req.params.folderID) {
      folderID = parseInt(req.params.folderID);
    }

    await prisma.files.create({
      data: {
        createdAt: date,
        cloudUrl: cloudFileObj.url,
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
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