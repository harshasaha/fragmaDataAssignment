const express = require('express');
const router = express.Router();
const callbackAndPromise = require('../controller/callbackAndPromise.controller');
const user = require('../controller/user.controller');
const passport = require('passport');

// require('../middleware/passport')(passport);
require('../middleware/passport')(passport)

router.get("/", (req, res, next) => {
    res.json({status:true, message:"This is Fragma Data assignment api", data:{"version_number":"v1.0.0"}})
});

// task 2 - callback into promise with example code of callback and promise (example code)
router.post('/generalCallback', callbackAndPromise.generalCallback);
router.post('/generalPromise', callbackAndPromise.generalPromise);
router.post('/callbackToPromise', callbackAndPromise.callbackToPromise);

// register and login
router.post('/register', user.register);
router.post('/login', user.login);

// jwt auth root based on bearer token
router.get('/userInfo', passport.authenticate('jwt', { session: false }), user.getUserInfo);

module.exports = router;
