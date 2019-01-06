const FacebookStrategy = require('passport-facebook').Strategy;
const User             = require('../models/users');
const session          = require('express-session');
const jwt              = require('jsonwebtoken'); 
const secret           = 'secrettoken';

module.exports = function(app, passport) {

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: false }}));

    passport.serializeUser(function(user, done) {
        token = jwt.sign({username : user.username, email: user.email}, secret, {expiresIn: '24h'});
        done(null, user.id);
    });
       
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    passport.use(new FacebookStrategy({
        clientID: 'YOUR CLIENT ID IS HERE',
        clientSecret: 'YOUR CLIENT SERRET IS HERE',
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOne({email: profile._json.email}).select('username password email').exec(function(err, user) {
            if (err) done(err);

            if (user && user != null) {
                done(null, user);
            }
        });
      }
    ));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), 
    function(req, res) { 
        return res.redirect('/facebook/' + token);
    });
    
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    return passport;
};