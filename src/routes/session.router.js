import { Router } from "express";
import userModel from "../data/models/users_model.js";
import { createHash, isValidPassword } from '../utils.js'
import passport from "passport";

//Session router
const router = Router();

//Register
router.post('/register', passport.authenticate('register', { failureRedirect: '/register' }), (req, res) => {
    res.redirect('/login')
})

//Login

router.post('/login', passport.authenticate('login', { failureRedirect: '/login' }), (req, res) => {
    req.session.user = req.user
    res.redirect('/home')
})

//Recovery

router.post('/recovery-password', async (req, res) => {
    try {
        const { email, password } = req.body;
        const exist = await userModel.findOne({ email });
        if (!exist) return res.status(401).send({ status: 'error', error: 'El usuario o la contraseña indicada no son correctos 😢' });
        //if the user exists
        await userModel.updateOne({ email }, { $set: { password: createHash(password) } })
        // Send success response
        /*         res.send({ status: 'success', message: 'Password reestablecida correctamente' }); */
        // Redirect to login */
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 'error', error: 'Ha ocurrido un error al reestablecer la contraseña' });
    }
})


//Logout
router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) return res.status(500).send({ status: 'error', error: 'logout failed' });
        res.redirect('/home');
    })
})

export default router;