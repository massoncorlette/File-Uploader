// const db = require("../db/queries");
const { prisma } = require('../viewController');


async function deleteFiles(req, res, next) {

  // deletes folder along with files
  try {
   const id =  req.params.folderID;

    if (id !== undefined) {

    const folderID = Number(id);

      await prisma.files.deleteMany({
        where: {
          folderID: folderID,
        },
      });

      await prisma.folders.delete({
        where: {
          id: folderID,
        },
      })
    } else {
      await prisma.files.deleteMany({});
    }

  } catch (error) {
    console.error(error);
    next(error);
  }
  res.redirect('/home');
};

async function deleteFile(req, res, next) {

  const id = Number(req.params.fileID);

  try {
    await prisma.files.delete({
      where: {
        id: id,
      },
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
  res.redirect('/home');
};

module.exports = { deleteFiles, deleteFile };