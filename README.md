# File-Uploader
Personal storage service, introduction to Prisma using Express and authentication using Passport

6/29 notes:
 - Create a new view for folder data to display files
 - create a new dynamic path for folder ID to pass into req.params
 - take req.params.folderID for view to Read files
 - CRUD Folders
 - add fetch function in ./utils to use for handleDownload
    *Cloudify obj has the properties we may need, refer to cloudify Docs
    

(make sure to update this upon completion)

Using Multer middleware for uploading data from a form: https://github.com/expressjs/multer 

Run: npm install express express-session pg passport passport-local ejs -- installs all in one go for express session password encryption

npm init -y
npm install prisma --save-dev  --setup package.json and set Prisma CLI as a dependency
(Rest of Prisma documentation here: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-node-postgresql)

npm install express-validator -- for sanitation and validation npm install dotenv -- for storing secure user data in env file (put require('dotenv').config() in root file to enable access in .env file);

npm install bcryptjs -- for serializing passwords npm install connect-pg-simple -- session storage (connecting db to session storage)