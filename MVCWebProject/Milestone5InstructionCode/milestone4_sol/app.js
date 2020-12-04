/**
 * Module dependencies.
 */

const express = require("express");
const path = require("path");
const logger = require("morgan");
const createError = require("http-errors");
const session = require("express-session");
const debug = require("debug")("cciconnections:server");
const http = require("http");
const mainController = require("./controller/mainController");
const connectionController = require("./controller/connectionController");
const userController = require("./controller/userController");

/**
 * Creating a new express application
 */
const app = express();

app.use(express.static(__dirname + '/node_modules'));

/**
 * View engine setup
 */
app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");

/**
 * Setting up middleware for logging
 */
app.use(logger("dev"));

/**
 * Setting up middleware for bodyParser
 */
app.use(express.json());
app.use(express.urlencoded({extended: false}));

/**
 * Setting up static files path
 */
app.use(express.static(path.join(__dirname, "assets")));

/**
 *  Session setup
 */
app.use(
    session({
        secret: "NbAd",
        resave: false,
        saveUninitialized: true,
    })
);

/**
 * Database connection
 */
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/NBAD", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

/**
 * Setting up the routes
 */
app.use("/", mainController);
app.use("/cciconnect", mainController);

//app.use('/cciconnect/connection/:connectionId', connectionController);

app.use("/cciconnect/myconnections", userController);
app.use("/cciconnect/addconnection", connectionController);
app.use("/cciconnect/", connectionController);

// Error Handling
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

/**
 * Get port and store in Express.
 */
const port = "8084";
console.log(port);
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    let addr = server.address();
    let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
}
