require('dotenv').config(); 
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; 

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' }); 
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Failed to authenticate token' }); 
        }
        req.userId = decoded.id; 
        next();
    });
};

module.exports = authenticate;
