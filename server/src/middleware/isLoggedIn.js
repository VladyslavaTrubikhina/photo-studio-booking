import jwt from 'jsonwebtoken';

export const isLoggedIn = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const secret = process.env.ACCESS_TOKEN_SECRET;

    if (!token) {
        return res.status(401).json({message: 'Authorization failed'});
    }

    try {
        req.user = jwt.verify(token, secret);
        next();
    } catch (error) {
        console.log("Token error: " + error);
        return res.status(401).json({message: 'Invalid or expired token'});
    }
};
