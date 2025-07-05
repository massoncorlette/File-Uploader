# File-Uploader
Personal storage service, introduction to Prisma using Express and authentication using Passport

To do:
 - Finish all CRUD functionality for files and folders
 - Add confimration module upon deleting all files on given views
 - add fetch function in ./utils to use for handleDownload
    *Cloudify obj has the properties we may need, refer to cloudify Docs
 - add size limit to uploads
 - check file types that can be uploaded on cloudify
 - add a loader wheel
 - add error handling to buttons and forms, etc.
 - design (touch up design responsiveness)
 - run linter and prettier
 - write up README on functionality and all libs and tools used
  (add screenshot in README)
 - deploy

    
(make sure to update this upon completion)

Using Multer middleware for uploading data from a form: https://github.com/expressjs/multer 

Run: npm install express express-session pg passport passport-local ejs -- installs all in one go for express session password encryption

npm init -y
npm install prisma --save-dev  --setup package.json and set Prisma CLI as a dependency
(Rest of Prisma documentation here: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-node-postgresql)

npm install express-validator -- for sanitation and validation npm install dotenv -- for storing secure user data in env file (put require('dotenv').config() in root file to enable access in .env file);

npm install bcryptjs -- for serializing passwords npm install connect-pg-simple -- session storage (connecting db to session storage)