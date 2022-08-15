const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = (req) => {
    const token = req.body.headers.Authorization
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_KEY)
    }
    catch (err) {
        const error = new Error('Please Login');
        error.code = 400;
        throw error;
    }
}