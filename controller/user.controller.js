const userService = require('../services/user.service')
const { to, ReE, ReS } =  require('../services/util.service');
const sha1 = require('sha1');
const { user } = require('../models');

// register user
module.exports.register = async function (req, res) {
    const body = req.body;

    if(!body.first_name) return ReE(res, 'First name not defined', 422);
    if(!body.email) return ReE(res, 'Email not defined', 422);
    if(!body.password) return ReE(res, 'password not defined', 422);

    // check if you exists or not
    [err, userRes] = await to(userService.checkUserExists(body.email));
    if(err) return ReE(res, err, 422);

    if(!userRes){

        const userJson = {
            first_name: body.first_name,
            last_name: body.last_name,
            phone: body.phone,
            password: sha1(body.password),
            email: body.email
         };
        //  register user if user not exists
        [err, userResult] = await to(userService.registerUser(userJson));
        if (err) return ReE(res, err, 422);

        return ReS(res, 'Student Register successfully.', userResult);

    } else {
        return ReE(res, 'Already exist. please try to login.', 422);
    }

};

// login user
module.exports.login = async function (req, res) {
    const userInfo = req.body;
    if(!userInfo.email) return ReE(res, 'Please enter Email', 422);
    if(!userInfo.password) return ReE(res, 'Please enter password', 422);

    // check password and login
    [err, userData] = await to(userService.login(userInfo.email, userInfo.password));
    if (err) return ReE(res, err, 422);

    if(userData){
        let userRes = userData.toJSON();

        // get jwt bearer token
        [err, token] = await to(userData.getJWT());
        if(err) return ReE(res, err, 422);
        if(token){
            userRes.bearer_token = token;
            return res.json({success:true, message:'login successfull', data: userRes});
        }
    } else {
        return ReE(res, 'invalid credentials', 422);
    }
};

// get user info after jwt auth
module.exports.getUserInfo = async function(req, res){
    userInfo = await to(user.findOne({ where: { email :  req.user.email},attributes: ['first_name','email','phone'] }));
    if(userInfo){
        return ReS(res,'got by jwt toke', userInfo);
    }
}