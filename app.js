var createError         = require("http-errors");
var express             = require("express");
var path                = require("path");
var cookieParser        = require("cookie-parser");
var logger              = require("morgan");
var mongoose            = require("mongoose");

var indexRouter         = require("./routes/index");
var usersRouter         = require("./routes/users");

var campsiteRouter      = require("./routes/campsiteRouter");
var promotionRouter     = require("./routes/promotionRouter");
var partnerRouter       = require("./routes/partnerRouter");
const session = require("express-session");
const fileStore = require("session-file-store")(session);





const url = "mongodb://localhost:27017/nucampsite";
const conn = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

conn.then(() => console.log("Connected correctly to mongo"), err => console.log(err));

var app = express();



function auth(req, res, next){
    console.log("HEADERS:", req.headers);
    console.log("SESSION:", req.session);

    // check for signed cookie (if no cookie check for auth header)
    if(!req.session.user){
        const authHeader = req.headers.authorization;
        if(!authHeader){
            const err = new Error("You are not authenticated!");
            res.setHeader("WWW-Authenticate", "Basic");
            err.status = 401;
            return next(err);
        }


        const auth = Buffer.from(authHeader.split(" ")[1], "base64").toString().split(":");
        const user = auth[0]
        const pass = auth[1]
        if(user === "admin" && pass === "password"){
             req.session.user = "admin";
            return next(); //authorized

        } else{
            const err = new Error("You are not authenticated!");
            res.setHeader("WWW-Authenticate", "Basic");
            err.status = 401;
            return next(err);
        }

    } else {
        console.log("ok you have a cookie");
        if(req.session.user === "admin"){
            return next();
        }

        const err = Error("You are not authenticated!");
        err.status = 401;
        return next(err);
    }
}



// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser("12345-67890-09876-54321"));
// invoking the session will return a function that will set the session obj on every request
// so every time a user make a request, express is gonig to call that function and not session({...})
// the session name will be what you set the name prop to and the session function will look for that cookie to know what session is
app.use(session({
    name: "session-id",
    secret: "12345-67890-09876-54321",
    saveUninitialized: false,
    resave: false,
    store: new fileStore()
}));

app.use(auth)
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/campsites", campsiteRouter);
app.use("/promotions", promotionRouter);
app.use("/partners", partnerRouter);


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
