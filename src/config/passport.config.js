import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import userModel from "../data/models/users_model.js";
import { createHash, isValidPassword } from '../utils.js'


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
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: hashedPassword,
            }
            await userModel.create(newUser);
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


    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    });
}

