// import User from "../models/user.js";
import jwt from 'jsonwebtoken';

const authentication = async (req, res, next) => {
    const headers = req.headers.authorization
    if (!headers || !headers.startsWith('Bearer ')) {
        res.status(500).json('Authentication invalid');
    }
    const token = headers.split(' ')[1];
    try {
        if (token.length < 500) {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(payload);
            req.user = { userId: payload.userId, name: payload.name, role : payload.role, city:payload.city, lat : payload.lat, lon:payload.lon}
        }
        else {
            const payload = jwt.decode(token);
            req.user = { userId: payload.sub, name: payload.name }
        }
        next();
    }
    catch (error) {
         return res.status(500).json("Token Expired Please Login Again");
    }
}

export default authentication;