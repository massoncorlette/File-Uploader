const express = require("express");
const { Router } = require("express");
const { displayHome, displayFolderView } = require("../controllers/viewController");
const { handleCreateFolder, handleUploadFile } = require("../controllers/dataController/createController");
const { validateCreateFolder } = require("../controllers/validation");

const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const date = new Date().toISOString().split('T')[0]; // use for cloud obj created_at property
    cb(null, file.fieldname + '-' + date);
  }
});

const upload = multer({ storage: storage });

const homeRouter = Router();

homeRouter.get("/", (req, res, next) => {

  return displayHome(req, res, next);
});

homeRouter.post('/create', validateCreateFolder(), handleCreateFolder);

homeRouter.post('/upload', upload.single('uploaded_file'), handleUploadFile);

homeRouter.post('/upload/:folderID', upload.single('uploaded_file'), handleUploadFile);

homeRouter.get("/folder/:folderID", (req, res, next) => {

  return displayFolderView(req, res, next);
});


module.exports = homeRouter;