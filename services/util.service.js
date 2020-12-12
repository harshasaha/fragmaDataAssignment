const { to } = require('await-to-js');
const pe = require('parse-error');

module.exports.to = async (promise) => {
    let err, res;
    [err, res] = await to(promise);
    if (err) return [pe(err)];
    return [null, res];
};

module.exports.ReE = function (res, err, code, data) { // Error Response

    if (typeof err == 'object' && typeof err.message != 'undefined') {
        err = err.message;
    }

    if (typeof code !== 'undefined') res.statusCode = code;
    var responseJSON = { success: false, error: err };

    if (data) { responseJSON.data = data; }
    return res.json(responseJSON);
};

module.exports.ReS = function (res, message, data, code) { // Success Response

    const responseJSON = { success: true, message: message, data: data };
    if (typeof code !== 'undefined') res.statusCode = code;
    return res.json(responseJSON);
};

module.exports.TE = TE = function (err_message, log) { // TE stands for Throw Error
   
    throw new Error(err_message);
};