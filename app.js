require('dotenv').config();
const path = require("node:path");
const express = require("express");
const expressSession = require("express-session");
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('./generated/prisma/client');
const passport = require("passport");
require("./config/passport"); // booting strategy before any initializing
const pgPool = require("./db/pool");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/styles"));

const indexRouter = require("./routes/index");
const signupRouter = require("./routes/signup");
const homeRouter = require("./routes/home");

app.use(express.urlencoded({ extended: false })); // so passport can parse form data

app.use(
  expressSession({
    cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'cats',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        pool: pgPool,
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
);

app.use(passport.initialize());  //initializes Passport
app.use(passport.session());  //enables persistent login sessions

app.use("/", indexRouter);
app.use("/sign-up", signupRouter);

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/home", homeRouter);

app.post("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

const { displayFileView } = require('./controllers/viewController');

app.get("/filedetails/:fileID", (req, res, next) => {
  
  return displayFileView(req, res, next);

});

const { handleEditFile } = require('./controllers/dataController/updateController');

app.post("/editfile/:fileID", (req, res, next) => {

  return handleEditFile(req, res, next);
});

const { handleDownloadFile } = require('./controllers/dataController/createController');

app.get("/download/:fileID", (req, res, next) => {

  return handleDownloadFile(req, res, next);
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
