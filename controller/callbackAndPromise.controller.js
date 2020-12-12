// for task 2 - considering getting post request from user for storing data and sending mail after data stored in db

// callback based code
module.exports.generalCallback = async function (req, res) {
    const userData = req.body;

    // store userdata
    addToDatabase(userData, (err, userData) => {
        if (err) throw err

        // send mail
        sendEmail(userData, (err, result) => {
            if (err) throw err
  
            // Tells frontend success message.
            res.json({status:true, message:"Callback call successfull", data: result})

        })
    })
};

// promise based code
module.exports.generalPromise = async function (req, res) {
    const userData = req.body;
    addToDatabase(userData)
    .then(userData => sendEmail(userData) )
    .then(result => res.json({status:true, message:"Promise call successfull", data: result}))
    .catch(err => console.log(err));

};

// callback to promise based code
module.exports.callbackToPromise = async function (req, res) {
    const userData = req.body;

    storeData(userData)
    .then(result => {res.json({status:true, message:"Callback to Promise call successfull", data: result})})
    .catch(err => {console.log(err)})
};

const storeData = (userData) => {
    return new Promise((resolve, reject) => {
        addToDatabase(userData, (err, user) => {
            if (err) return reject(err)
            sendEmail(user, (err, result) => {
                if (err) throw err
                resolve(result)
            })
        })
    })
}
// End call back to promised based call

const addToDatabase = (data) =>{
    return data;
}

const sendEmail = (data) =>{
    return data;
}