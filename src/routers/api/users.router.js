import { Router } from "express";
import UsersController from "../../controller/users.controller.js";

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const orders = await UsersController.getAll();
        res.status(200).json({ message: orders })
    } catch (error) {
        next(error)
    }
});


router.get('/:uid', async (req, res, next) => {
    try {
        const { params: { uid } } = req;
        const order = await UsersController.getById(uid);
        res.status(200).json({ message: order });
    } catch (error) {
        next(error);
    }
});


router.post('/', async (req, res, next) => {
    try {
        const { body } = req;
        const order = await UsersController.create(body);
        res.status(201).json({ message: order });
    } catch (error) {
        next(error);
    }
});


router.put('/:uid', async (req, res, next) => {
    try {
        const { params: { uid }, body } = req;
        await UsersController.updateById(uid, body);
        res.status(204).json({ message: order });
    } catch (error) {
        next(error);
    }
});


export default router;