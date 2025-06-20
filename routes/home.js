const express = require("express");
const { Router } = require("express");
const { displayHome } = require("../controllers/viewController");
const { handleCreateFolder } = require("../controllers/dataController/createController");
const { validateCreateFolder } = require("../controllers/validation");

const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

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


homeRouter.post('/create', validateCreateFolder(), handleCreateFolder);


module.exports = homeRouter;