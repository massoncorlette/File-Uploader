const { PrismaClient } = require('../generated/prisma/client');
const prisma = new PrismaClient();

async function checkEmail(value) {

  const user = await prisma.user.findUnique({
    where: {
      email: value,
    },
  });

  if (user) {
    return true;
  } else {
    return false;
  }
};


module.exports = {
  checkEmail
}