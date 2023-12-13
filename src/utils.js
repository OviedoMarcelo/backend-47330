import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

//Hashing password methods
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);


//JsonWebToken
export const tokenGenerator = (user) => {
    const { _id, first_name, last_name, email, role } = user;
    const payload = {
        id: _id,
        first_name,
        last_name,
        email,
        role
    }
    return jwt.sign(payload, JWT_SECRET)
}

export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (error, payload) => {
            if (error) {
                return reject(error);
            }
            resolve(payload);
        });
    });
}

export const authorizationMiddleware = (roles) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { rol: userRole } = req.user;
    if (!roles.includes(userRole)) {
        return res.status(403).json({ message: 'No premissions' });
    }
    next();
}


//Error 
export class Exception extends Error {
    constructor(message, status) {
        super(message);
        this.statusCode = status;
    }
};