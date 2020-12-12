const express = require('express');
const router = express.Router();
const callbackAndPromise = require('../controller/callbackAndPromise.controller');

router.get("/", (req, res, next) => {
    res.json({status:true, message:"This is Fragma Data assignment api", data:{"version_number":"v1.0.0"}})
});

// task 2 - callback into promise with example code of callback and promise
router.post('/generalCallback', callbackAndPromise.generalCallback);
router.post('/generalPromise', callbackAndPromise.generalPromise);
router.post('/callbackToPromise', callbackAndPromise.callbackToPromise);

module.exports = router;
