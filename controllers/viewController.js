
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
    next(error);
  }
};

async function getFilesByFolder(id) {

  try {
    const files = await prisma.files.findMany({
      where: {
        id: id,
      },
   });

   return files;
  } catch (error) {
    console.error(error);
    next(error);
  }
};

async function displayLogin(req, res, next) {

  res.render("index");
}

async function displayHome(req, res, next) {

  const files = await prisma.files.findMany();
  const folders = await prisma.folders.findMany();

  console.log(files);

  res.render("home", {files:files, folders:folders});

}


module.exports = { 
  prisma,
  displayLogin,
  displayHome
};
