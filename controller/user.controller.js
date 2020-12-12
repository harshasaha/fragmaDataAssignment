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

    [err, user] = await to(userService.checkUserExists(body.email));
    if(err) return ReE(res, err, 422);

    if(!user){

        const userJson = {
            first_name: body.first_name,
            last_name: body.last_name,
            phone: body.phone,
            password: sha1(body.password),
            email: body.email
         };

        [err, user] = await to(userService.registerUser(userJson));
        if (err) return ReE(res, err, 422);

        return ReS(res, 'Student Register successfully.', user);

    } else {
        return ReE(res, 'Already exist. please try to login.', 422);
    }

};

// login user
module.exports.login = async function (req, res) {
    const userData = req.body;
    if(!userData.email) return ReE(res, 'Please enter Email', 422);
    if(!userData.password) return ReE(res, 'Please enter password', 422);

    [err, user] = await to(userService.login(userData.email, userData.password));
    if (err) return ReE(res, err, 422);

    if(user){
        let userRes = user.toJSON();

        [err, token] = await to(user.getJWT());
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