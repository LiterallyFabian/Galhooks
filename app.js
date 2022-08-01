const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
require('dotenv').config();

const indexRouter = require('./routes/index');
const mysql2 = require("mysql2");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// Connect to database
connection = mysql2.createConnection({
    host: process.env.mysql_host || 'localhost',
    user: process.env.mysql_user,
    password: process.env.mysql_password,
    database: process.env.mysql_database
});

connection.connect(function (e) {
    if (e) {
        console.error(e);
    }

    console.log('Connected to the MySQL server ' + process.env.mysql_database);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

const port = 3000;

const server = http.createServer(app);


server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});