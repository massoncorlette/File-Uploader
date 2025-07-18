
// const db = require("../db/queries");
const { PrismaClient } = require('../generated/prisma/client');
const prisma = new PrismaClient();

async function getFileDetails(id) {

  try {
    const file = await prisma.files.findUnique({
      where: {
        id: id,
      },
   });

   return file;

  } catch (error) {
    console.error(error);
   // next(error);
  }
};

async function getFilesByFolder(id) {

  try {
    const files = await prisma.files.findMany({
      where: {
        folderID: id,
      },
   });

   return files;
  } catch (error) {
    console.error(error);
   // next(error);
  }
};

async function getFolderInfo(id) {

  try {
    const folder = await prisma.folders.findUnique({
      where: {
        id: id,
      },
   });

   return folder;
  } catch (error) {
    console.error(error);
   // next(error);
  }
};


async function displayLogin(req, res, next) {

  res.render("index");
};

async function displayHome(req, res, next) {

  const files = await prisma.files.findMany();
  const folders = await prisma.folders.findMany();

  res.render("home", {files:files, folders:folders, req:req});

};

async function displayFolderView(req, res, next) {

  const folderID = parseInt(req.params.folderID);
  const folders = null;

  const files = await getFilesByFolder(folderID);
  const folderInfo = await getFolderInfo(folderID);

  res.render("home", {files:files, folders:folders, req:req, folderInfo:folderInfo});
};

async function displayFileView(req, res, next) {

  const fileID = parseInt(req.params.fileID);
  const file = await getFileDetails(fileID);
  let foldername = null;

  if (file.folderID !== null) {
    let folder = await getFolderInfo(file.folderID); 
    foldername = folder.name;
  };

  res.render("fileView", {file:file, req:req, foldername:foldername});
};


module.exports = { 
  prisma,
  displayLogin,
  displayHome,
  displayFolderView,
  displayFileView
};
