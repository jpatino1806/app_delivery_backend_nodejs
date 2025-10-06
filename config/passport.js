// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
const {Strategy, ExtractJwt} = require('passport-jwt');
const User = require('../models/user');
//const { func } = require('./config');
const Keys = require('./keys');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = Keys.secretOrKey;
    
    // passport.use(JwtStrategy(opts, (jwt_payload, done) => {
    //     User.findById(jwt_payload.id, (err, user) => {
    //         if (err) {
    //             return done(err, false);
    //         }
    //         if (!user) {
    //             return done(null, user);
    //         }else{
    //             return done(null, false);
    //         }
    //     })
    // })) 

    passport.use(
        new Strategy(opts, async (jwt_payload, done) => {
            User.findById(jwt_payload.id, (err, user) => {
                if (err) {
                    return done(err, null);
                }
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            })
        }
    ))
    
}


