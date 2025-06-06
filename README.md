# File-Uploader
Personal storage service, introduction to Prisma using Express and authentication using Passport

(make sure to update this upon completion)

Run: npm install express express-session pg passport passport-local ejs -- installs all in one go for express session password encryption

npm init -y
npm install prisma --save-dev  --setup package.json and set Prisma CLI as a dependency
(Rest of Prisma documentation here: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-node-postgresql)

npm install express-validator -- for sanitation and validation npm install dotenv -- for storing secure user data in env file (put require('dotenv').config() in root file to enable access in .env file);

npm install bcryptjs -- for serializing passwords npm install connect-pg-simple -- session storage (connecting db to session storage)