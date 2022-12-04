var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
var createError = require("http-errors");
var session = require("express-session");
var cors = require("cors");
var bodyparser = require("body-parser");
const conncetDB = require("./config/db");


// Routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var userRouter = require('./routes/User')
const itemsRouter = require("./routes/ItemRoute")
const categorieRouter = require("./routes/CategorieRoute")
// const uploadImgRouter = require('./routes/Uploadimg');
conncetDB();

/// middelwar ///
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next()
})
app.use(cors());
app.use(bodyparser.json());
app.use('/images', express.static('public/images'));

/// my routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/user", userRouter);
app.use('/api/items',itemsRouter);
app.use('/api/categorie',categorieRouter)
// app.use('/api/UploadImage', uploadImgRouter);

// Create error
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send({
    success: false,
    message: err.message,
  });
});

module.exports = app;
