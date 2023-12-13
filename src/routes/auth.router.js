import { Router } from "express";
import userModel from "../data/models/users_model.js";
import { createHash, isValidPassword, tokenGenerator } from '../utils.js'
import passport from "passport";
import cartModel from "../data/models/cart_model.js";
import cartManager from "../data/dbManagers/cart_manager.js"

//Session router
const router = Router();

router.post('/auth/register', async (req, res) => {
    const {
        first_name,
        last_name,
        email,
        password,
        age,
    } = req.body;
    if (
        !first_name ||
        !last_name ||
        !email ||
        !age ||
        !password
    ) {
        return res.status(400).json({ message: 'Todos los campos son requeridos 😨' });
    }
    let user = await userModel.findOne({ email });
    if (user) {
        return res.status(400).json({ message: 'Correo ya registrado 😨. Intenta recuperar tu contraseña 😁.' });
    }
    user = await userModel.create({
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
    });
    const cart = await cartModel.getOrCreateCart(user._id);
    user.cart = cart._id;
    await user.save();
    const token = tokenGenerator(user, user.cart);
    res.cookie('access_token', token, { httpOnly: true, signed: true });
    res.status(201)
        .redirect('/')
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    const cart = await cartManager.getOrCreateCart(user._id);
    if (!user) {
        return res.status(401).json({ message: 'Correo o contraseña invaldos 😨' });
    }
    const validPassword = isValidPassword(password, user);
    if (!validPassword) {
        return res.status(401).json({ message: 'Correo o contraseña invaldos 😨' });
    }
    const token = tokenGenerator(user, cart._id);
    res
        .cookie('access_token', token, { maxAge: 1000 * 60 * 30, httpOnly: true, signed: true })
        .status(200)
        .redirect('/home')
});

router.post('/recovery-password', async (req, res) => {
    const { email, newPassword } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(401).send('Correo o contraseña invalidos.')
    };
    await userModel.updateOne({ email }, { $set: { password: createHash(newPassword) } });
    res.redirect('/login');
});




//START -------------> OLD CODE

//Register
/* router.post('/register', passport.authenticate('register', { failureRedirect: '/register' }), (req, res) => {
    res.redirect('/login')
}) */

//Login

/* router.post('/login', passport.authenticate('login', { failureRedirect: '/login' }), (req, res) => {
    req.session.user = req.user
    res.redirect('/home')
}) */

//Recovery

/* router.post('/recovery-password', async (req, res) => {
    try {
        const { email, password } = req.body;
        const exist = await userModel.findOne({ email });
        if (!exist) return res.status(401).send({ status: 'error', error: 'El usuario o la contraseña indicada no son correctos 😢' });
        //if the user exists
        await userModel.updateOne({ email }, { $set: { password: createHash(password) } })
        // Send success response
        // Redirect to login
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 'error', error: 'Ha ocurrido un error al reestablecer la contraseña' });
    }
})  */


//GIT HUB 

/* router.get('/github', passport.authenticate('github', { scope: ['user:email'] }
), async (req, res) => {
    res.send({ status: 'success', message: 'User registered successfully' })
});

router.get('/github-callback', passport.authenticate('github', { failureRedirect: '/login' }
), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/home')
}) */



//Logout
/* router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) return res.status(500).send({ status: 'error', error: 'logout failed' });
        res.redirect('/home');
    })
}) */

export default router;