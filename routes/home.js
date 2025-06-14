const express = require("express");
const { Router } = require("express");
const { displayHome } = require("../controllers/viewController");

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

let uploadedFiles = [];

const homeRouter = Router();

homeRouter.get("/", (req, res, next) => {

  return displayHome(req, res, next, uploadedFiles);
});

homeRouter.post('/upload', upload.single('uploaded_file'), function (req, res) {

  console.log(uploadedFiles);

  uploadedFiles.push({
    originalname: req.file.originalname, 
    filename: req.file.filename,
    file: req.file
  });
  res.redirect("/home");
});


module.exports = homeRouter;