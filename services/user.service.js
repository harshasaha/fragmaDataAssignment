const { user } = require('../models');
const { to, ReE, ReS } =  require('./util.service');

module.exports.checkUserExists = async function (email) {

    [err, userRes] = await to(user.findOne({ where: { email: email } }));
    if (err) throw err;
    return userRes;
}

module.exports.registerUser = async function (userData) {

    [err, userRes] = await to(user.create(userData));
    if (err) throw err;
    return userRes;
}

module.exports.login = async function (email, password) {
    let userRes;
    [err, userRes] = await to(user.findOne({ where: { email: email } }));
    if (err) throw err;
    if(!userRes){
        return ;
    }
    [err, userRes] = await to(userRes.comparePassword(password));
    if (err) throw err;
    return userRes;
}