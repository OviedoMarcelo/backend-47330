import { Router } from "express";
import BusinessController from "../../controller/business.controller.js";

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const orders = await BusinessController.getAll();
        res.status(200).json({ message: orders })
    } catch (error) {
        next(error)
    }
});


router.get('/:bid', async (req, res, next) => {
    try {
        const { params: { bid } } = req;
        const order = await BusinessController.getById(bid);
        res.status(200).json({ message: order });
    } catch (error) {
        next(error);
    }
});


router.post('/', async (req, res, next) => {
    try {
        const { body } = req;
        const order = await BusinessController.create(body);
        res.status(201).json({ message: order });
    } catch (error) {
        next(error);
    }
});


router.put('/:bid', async (req, res, next) => {
    try {
        const { params: { bid }, body } = req;
        await BusinessController.updateById(bid, body);
        res.status(204).json({ message: order });
    } catch (error) {
        next(error);
    }
});


export default router;