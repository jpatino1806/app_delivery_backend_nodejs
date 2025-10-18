const {Strategy, ExtractJwt} = require('passport-jwt');
const User = require('../models/user');
const Keys = require('./keys');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = Keys.secretOrKey;
    
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


