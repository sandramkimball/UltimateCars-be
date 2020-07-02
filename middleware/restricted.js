const jwt = require('jsonwebtoken')
require('dotenv')

module.exports = ( req, res, next ) => {
    const token = req.headers.authorization;

    if(token){
        const secret = process.env.SECRET

        jwt.verify(token, secret, (err, decodedToken) => {
            if(err){
                res.json({ message: err.message, error: err })
            } else {
                req.decodedToken = decodedToken
                next()
            }
        })
    } else {
        res.json({ message: 'No credentials provided.' })
    }
}