// const db = require("../db/queries");
const { prisma } = require('../viewController');


async function deleteFiles(folderID) {

  // deletes folder along with files
  try {
    if (folderID) {
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
   // next(error);
  }
};

async function deleteFile(id) {

  try {
    await prisma.files.delete({
      where: {
        id: id,
      },
    });

  } catch (error) {
    console.error(error);
   // next(error);
  }
};

module.exports = { deleteFiles, deleteFile };