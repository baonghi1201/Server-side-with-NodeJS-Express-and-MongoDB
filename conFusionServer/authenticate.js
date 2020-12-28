var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy= require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var FacebookTokenStrategy = require('passport-facebook-token');

var jwt=require('jsonwebtoken');
var ObjectID = require('mongodb').ObjectID


var config= require('./config');


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user){
    //Create JSON web token
    return jwt.sign(user, config.secretKey, 
        {expiresIn: 3600});
};

//Create 'jsonwebtoken based strategy'
var opts={};
opts.jwtFromRequest  = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey  = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts, 
    (jwt_payload, done)=>{
        console.log('Jwt ', jwt_payload);
        User.findOne({_id:jwt_payload._id}, (err, user) =>{
            if(err){
                return done(err, false);
            }
            else if (user){
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt',{session:false});


exports.checkUserId = ((req ,res ,next)=>{
    User.findOne({_id:req.user._id})
})


exports.verifyAdmin = ((req, res, next)=>{
    User.findOne({_id: req.user._id})
    .then(user=>{
        console.log("User ", req.user);
        if (user.admin){
            console.log("Successfully logged in as Admin");
            next();
        }
        else{
            err= new Error("You are not authorized to perform this operation");
            err.status = 403;
            return next(err);
        }
    }, err => next(err))
    .catch(err => next(err))
})

exports.facebookPassport = passport.use(new FacebookTokenStrategy({
        clientID: config.facebook.clientId,
        clientSecret: config.facebook.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({facebookId: profile.id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (!err && user !== null) {
                return done(null, user);
            }
            else {
                user = new User({ username: profile.displayName });
                user.facebookId = profile.id;
                user.firstname = profile.name.givenName;
                user.lastname = profile.name.familyName;
                user.save((err, user) => {
                    if (err)
                        return done(err, false);
                    else
                        return done(null, user);
                })
            }
        });
    }
));