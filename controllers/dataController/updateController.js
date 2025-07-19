const { prisma } = require('../viewController');

const { validationResult } = require("express-validator");

async function handleEditFile(req, res, next) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("home", {
      errors: errors.array(),
    });
  }
  try {

    await prisma.files.update({
      where: {
        id: parseInt(req.params.fileID)
      },
      data: {
        customName: req.body.filename,
      }
   });
  res.redirect("/home");
    
  } catch (error) {
    console.error(error);
    next(error);    
  }
};

module.exports = { handleEditFile };
