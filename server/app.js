"use strict";

const express  = require("express");
const mongoose = require("mongoose");
/* Express Middlewares */
const bodyParser = require("body-parser");
const morgan     = require("morgan");
const passport   = require("passport");
/* Passport Strategies */
const BasicStrategy = require("passport-http").BasicStrategy;
/* our own modules */
const User = require("./models/user");

/* create our app */
const app = express();

const cors   = require("cors");

/* configuration */
app.locals.name   = require("./package.json").name;
app.locals.config = require(`./config/${process.env.NODE_ENV}`);

/* mongoose & MongoDB stuff */
mongoose.Promise = global.Promise; // Use native promises
mongoose.set('debug', (process.env.NODE_ENV === 'development'));

/* mongoose connection */
app.locals.connect = function () {
    const dbname = app.locals.config.mongodb.database;
    console.log(`NODE_ENV=${process.env.NODE_ENV}, connecting to ${dbname}`);
    return mongoose.connect(dbname, {useMongoClient: true});
};

/* Express Middlewares setup */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));
if (process.env.NODE_ENV === 'production')
    app.use(morgan('combined'));
app.use(passport.initialize());
app.use(cors())

/* authentication: Basic Auth with Passport */
passport.use(new BasicStrategy((email, password, done) => {
    User.authenticate(email, password).then(user => {
        return done(/* no error */null, user);
    }).catch(done);
}));

/* our routers */
app.use("/api/users", require("./routers/user"));
app.use("/api/events", require("./routers/event"));

// expose our app to require()
module.exports = app;
