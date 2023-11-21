import { Router } from "express";
import userModel from "../data/models/users_model.js";

//Session router
const router = Router();

router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        const exist = await userModel.findOne({ email });

        if (exist) return res.status(400).send({ status: 'error', error: 'El usuario ya existe' });

        const user = {
            first_name,
            last_name,
            email,
            age,
            password,
        }
        await userModel.create(user);
        res.send({ status: 'success', message: 'user registered' })
    } catch (error) {
        return res.status(500).send({ status: 'error', error });
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password });
        if (!user) return res.status(400).send({ status: 'error', error: 'incorrect credentials or user' })
        req.session.user = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
            role: 'user'
        }
        res.send({ status: 'success', message: 'login success' })
        if (email === 'adminCoder@coder.com') {
            req.session.user.role = 'admin'
        }
        console.log('User dentro del router:',req.session.user)
    } catch (error) {
        return res.status(500).send({ status: 'error', error });
    }
})

//Async?
router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) return res.status(500).send({ status: 'error', error: 'logout failed' });
        res.redirect('/home');
    })
})

export default router;