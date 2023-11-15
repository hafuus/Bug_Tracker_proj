const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userRouter = require('./routes/user');
const issueRouter = require('./routes/issue');
const projectRouter = require('./routes/project'); 
const User = require('./models/user');

// Load environment variables
dotenv.config({ path: './.env' });

// Connect to the MongoDB database
require('./connection');

// Middleware
app.use(express.json());
app.use(cors());

// Middleware...
// app.use(bodyParser.json());
// app.use(passport.initialize());
// app.use(passport.session());
// Other middleware...



// Body parser middleware is not needed; express.json() already parses JSON

// Express session configuration
app.use(
  session({
    secret: 'key', // Change this to a long, random string
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Configure the local strategy
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    });
  })
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Define routes
const port = 3300;

app.use('/user', userRouter);
app.use('/issue', issueRouter);
app.use('/project', projectRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
