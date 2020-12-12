const { ExtractJwt, Strategy } = require('passport-jwt');
var config = require('./../config/'+(process.env.NODE_ENV || 'default').trim());
const { user } = require('../models');
const CryptoJS = require("crypto-js");
const { to } =  require('../services/util.service');

module.exports = function (passport) {

    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.jwt_sec;
    opts.passReqToCallback = true;

    passport.use(new Strategy(opts, async function (req, jwt_payload, done) {

        let exp = new Date(jwt_payload.exp * 1000);
        let currentTime = new Date();
        let diferenceOfDate = exp.getTime() - currentTime.getTime();

        if (diferenceOfDate < 0)
            return done(null, false);

        if (jwt_payload.token) {

            let token = jwt_payload.token;
            var bytes = CryptoJS.AES.decrypt(token, config.crypt_key);
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            if(decryptedData.email){
                [err, userInfo] = await to(user.findOne({ where: { email :  decryptedData.email},attributes: ['first_name','email','phone'] }));
                if(err) return done(err, false);
                return done(null, userInfo);
            }

        } else {
            return done(null, false);
        }

    }));
}