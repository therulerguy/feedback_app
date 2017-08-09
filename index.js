const express = require('express');
const mongoose = require('mongoose');
// Gives us access to cookies
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
// Put the user model before the passport since passport requires user
require('./models/user');
require('./services/passport');

// connecting mongoose db with link from mLab
mongoose.connect(keys.mongoURI);

const app = express();

// Tell express to make use of cookies inside our application
app.use(
    cookieSession({
        // 30 days for the cookies
        maxAge: 30 * 24 * 60 * 60 * 1000,
        // Sign and encrypt our cookie
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);


// this is a route handler
// app.get('/', (req, res) => {
//     res.send({ bye: 'buddy' })
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT);


 