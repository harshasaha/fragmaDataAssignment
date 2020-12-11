require('dotenv').config();

module.exports = {
    port : 5000,
    mode : 'production',
    host : 'http://localhost:',
    secureData : process.env.sensitiveData ? process.env.sensitiveData : ''
}