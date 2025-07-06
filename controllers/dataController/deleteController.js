// const db = require("../db/queries");
const { prisma } = require('../viewController');


async function deleteFiles(req, res, next) {

  const folderID = req.params.folderID;
  // deletes folder along with files
  try {
    if (folderID !== null || undefined) {
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