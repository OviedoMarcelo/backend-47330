import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import userModel from "../data/models/users_model.js";
import { createHash, isValidPassword } from '../utils.js'
import GitHubStrategy from 'passport-github2'
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from 'dotenv';
dotenv.config();

const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const JWT_SECRET = process.env.JWT_SECRET;

const opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: JWT_SECRET,
};

function cookieExtractor(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['access_token'];
    }
    return token;
}

export const init = () => {
    passport.use('jwt', new JwtStrategy(opts, (payload, done) => {
        console.log("Payload received in JWT strategy", payload);
        return done(null, payload)
    }))
}
