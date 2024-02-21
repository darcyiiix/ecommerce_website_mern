import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from './asyncHandler.js';

const protect = asyncHandler(async (req, res, next) => {

    let token; // Initializes token

    // Read the JWT token from HTTP-Only Cookie

    token = req.cookies.jwt;

    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next(); 
        } catch (error) {
            console.log(error)
            res.status(401);
            throw new Error('User not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('User not authorized, no token');
    }
});


// Admin Middleware

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next(); // Moves on to next middleware
    } else {
        res.status(401); // throws an error
        throw new Error('User not authorized as admin')
    }
};

export { protect, admin };