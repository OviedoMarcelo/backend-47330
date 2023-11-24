import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import userModel from "../data/models/users_model.js";
import { createHash, isValidPassword } from '../utils.js'
import GitHubStrategy from 'passport-github2'
import dotenv from 'dotenv';
dotenv.config();

const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;


const opts = {
    usernameField: 'email', //Defino que el email será el campo principal de búsqueda
    passReqToCallback: true, //Esto dice que devuelve el objeto request 
};


export const init = () => {

    //Passport register
    passport.use('register', new LocalStrategy(opts, async (req, email, password, done) => {
        try {
            const { first_name, last_name, age, email } = req.body;
            const user = await userModel.findOne({ email });
            if (user) {
                return done(new Error('User already register 😢'))
            }
            const hashedPassword = createHash(password);
            const newUser = await userModel.create({
                first_name,
                last_name,
                email,
                age,
                password: hashedPassword,
            })
            done(null, newUser)
        } catch (error) {
            done(new Error(`Registration failed ${error.message} 😢`))
        }
    }));

    //Passport Login

    passport.use('login', new LocalStrategy(opts, async (req, email, password, done) => {
        try {
            const user = await userModel.findOne({ email });

            if (!user) { //user exist?
                return done(new Error('Correo o contraseña inválidos 😢')) //no se hizo el registro porque no existe el user
            }
            if (!isValidPassword(password, user)) {
                return done(new Error('Correo o contraseña inválidos 😢')) //no se hizo el registro porque no existe el user
            }
            return done(null, user) //req.user = user
        } catch (error) {
            return done(error)
        }
    }));


    //Git hub strategy

    passport.use('github', new GitHubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/sessions/github-callback",
        scope: ['user:email']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log('github profile: ', profile)
            const email = profile.emails[0].value;
            const user = await userModel.findOne({ email });
            if (!user) {
                const newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    age: "",
                    email,
                    password: ""
                }
                const result = await userModel.create(newUser)
                done(null, result)
            } else {
                done(null, user)
            }
        } catch (error) {
            return done(error);
        }
    }));



    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    });
}

