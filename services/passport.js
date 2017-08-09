const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// One argument means you're trying to fetch something from mongoose
// Two arguments means you're trying to load something into mongoose
// User in this case is a model class
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // Finds a user based off the ID
    User.findById(id).then(user => {
        done(null, user);
    });
});


passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, 
    (accessToken, refreshToken, profile, done) => {

        User.findOne({ googleId: profile.id }).then((existingUser) => {
            if (existingUser) {
                // we already have a record with give profile id
                // done - first parameter is error and second element is user record
                done(null, existingUser);
            } else {
                // we don't have a user record and create new user
                // The .save() will save it to the database
                new User({ googleId: profile.id })
                .save()
                .then(user => done(null, user));
            }
        });

        console.log('Access Token ' + accessToken);
        console.log('Refresh token ' + refreshToken);
        console.log(JSON.stringify(profile))    
    })
);