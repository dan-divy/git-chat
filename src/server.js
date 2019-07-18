const createError = require("http-errors");
const express = require("express");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const passport = require("passport");
const config =
  (process.env.config && JSON.parse(process.env.config)) ||
  require("./config/config");
console.log(config);
if (config.dsn.length > 10) {
  const Sentry = require("@sentry/node");
  Sentry.init({ dsn: config.dsn });
}

const database = require("./utils/handlers/database");

const indexRouter = require("./routes/index");
const restApi = require("./routes/api/v1/index");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const repoRouter = require("./routes/repo");
const infoRouter = require("./routes/info");
const webhookRouter = require("./routes/info");

const app = express();
const queue = require("queue");
app.q = queue();
app.q.autostart = true;
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const cooky = {
  secret: "work hard",
  resave: true,
  expires: new Date() * 60 * 60 * 24 * 7,
  saveUninitialized: true
};
app.sessionMiddleware = session(cooky);
app.set("trust proxy", 1);
app.use(helmet());
app.use(app.sessionMiddleware);
app.use(logger("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  if (!req.session.user) req.session.user = false;
  res.locals.user = req.session.user;
  if (req.path == "/" || !req.path) res.locals.path = " Home";
  else res.locals.path = req.path;
  next();
});

app.use("/", indexRouter);
app.use("/info", infoRouter);
app.use("/auth", authRouter);
app.use("/webhook/", webhookRouter);

app.use((req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/");
  } else {
    next();
  }
});

app.use("/", userRouter);
app.use("/repo", repoRouter);
app.use("/api", restApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
